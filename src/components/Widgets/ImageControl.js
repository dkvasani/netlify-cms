import PropTypes from 'prop-types';
import React from 'react';
import { truncateMiddle } from '../../lib/textHelper';
import { Loader } from '../UI';
import AssetProxy, { createAssetProxy } from '../../valueObjects/AssetProxy';
import { prefixer } from '../../lib/styleHelper';

const styles = prefixer('fileControl');

const MAX_DISPLAY_LENGTH = 50;

export default class ImageControl extends React.Component {
  state = {
    processing: false,
  };

  promise = null;

  isValid = () => {
    if (this.promise) {
      return this.promise;
    }
    return { error: false };
  };


  handleFileInputRef = (el) => {
    this._fileInput = el;
  };

  handleClick = (e) => {
    this._fileInput.click();
  };

  handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleChange = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const fileList = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const files = [...fileList];
    const imageType = /^image\//;

    // Iterate through the list of files and return the first image on the list
    const file = files.find((currentFile) => {
      if (imageType.test(currentFile.type)) {
        return currentFile;
      }
    });

    this.props.onRemoveAsset(this.props.value);
    if (file) {
      this.setState({ processing: true });
      this.promise = createAssetProxy(file.name, file)
      .then((assetProxy) => {
        this.setState({ processing: false });
        this.props.onAddAsset(assetProxy);
        this.props.onChange(assetProxy.public_path);
      });
    } else {
      this.props.onChange(null);
    }
  };

  renderImageName = () => {
    if (!this.props.value) return null;
    if (this.value instanceof AssetProxy) {
      return truncateMiddle(this.props.value.path, MAX_DISPLAY_LENGTH);
    } else {
      return truncateMiddle(this.props.value, MAX_DISPLAY_LENGTH);
    }
  };

  render() {
    const { processing } = this.state;
    const imageName = this.renderImageName();
    if (processing) {
      return (
        <div className="nc-fileControl-imageUpload">
          <span className="nc-fileControl-message">
            <Loader active />
          </span>
        </div>
      );
    }
    return (
      <div
        className="nc-fileControl-imageUpload"
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDrop={this.handleChange}
      >
        <span className="nc-fileControl-message" onClick={this.handleClick}>
          {imageName ? imageName : 'Click here to upload an image from your computer, or drag and drop a file directly into this box'}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={this.handleChange}
          className="nc-fileControl-input"
          ref={this.handleFileInputRef}
        />
      </div>
    );
  }
}

ImageControl.propTypes = {
  onAddAsset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemoveAsset: PropTypes.func.isRequired,
  value: PropTypes.node,
};

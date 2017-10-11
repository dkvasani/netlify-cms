import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SplitPane from 'react-split-pane';
import Button from 'react-toolbox/lib/button';
import classnames from 'classnames';
import { ScrollSync, ScrollSyncPane } from '../ScrollSync';
import ControlPane from '../ControlPanel/ControlPane';
import PreviewPane from '../PreviewPane/PreviewPane';
import Toolbar from './EntryEditorToolbar';
import { StickyContext } from '../UI/Sticky/Sticky';
import stickyStyles from '../UI/Sticky/Sticky.css';



const PREVIEW_VISIBLE = 'cms.preview-visible';

class EntryEditor extends Component {
  state = {
    showEventBlocker: false,
    previewVisible: localStorage.getItem(PREVIEW_VISIBLE) !== "false",
  };

  handleSplitPaneDragStart = () => {
    this.setState({ showEventBlocker: true });
  };

  handleSplitPaneDragFinished = () => {
    this.setState({ showEventBlocker: false });
  };

  handleOnPersist = () => {
    this.controlPaneRef.validate();
    this.props.onPersist();
  };

  handleTogglePreview = () => {
    const newPreviewVisible = !this.state.previewVisible;
    this.setState({ previewVisible: newPreviewVisible });
    localStorage.setItem(PREVIEW_VISIBLE, newPreviewVisible);
  };

  render() {
    const {
        collection,
        entry,
        fields,
        fieldsMetaData,
        fieldsErrors,
        getAsset,
        onChange,
        enableSave,
        showDelete,
        onDelete,
        onValidate,
        onAddAsset,
        onRemoveAsset,
        onCancelEdit,
    } = this.props;

    const { previewVisible, showEventBlocker } = this.state;

    const collectionPreviewEnabled = collection.getIn(['editor', 'preview'], true);

    const togglePreviewButton = (
      <Button
        className={classnames('nc-entryEditor-previewToggle', { previewVisible: 'nc-entryEditor-previewToggleShow' })}
        onClick={this.handleTogglePreview}
        icon={previewVisible ? 'visibility_off' : 'visibility'}
        floating
        mini
      />
    );

    const editor = (
      <StickyContext
        className={classnames('nc-entryEditor-controlPane', { ['nc-entryEditor-blocker']: showEventBlocker })}
        registerListener={fn => this.updateStickyContext = fn}
      >
        { collectionPreviewEnabled ? togglePreviewButton : null }
        <ControlPane
          collection={collection}
          entry={entry}
          fields={fields}
          fieldsMetaData={fieldsMetaData}
          fieldsErrors={fieldsErrors}
          getAsset={getAsset}
          onChange={onChange}
          onValidate={onValidate}
          onAddAsset={onAddAsset}
          onRemoveAsset={onRemoveAsset}
          ref={c => this.controlPaneRef = c} // eslint-disable-line
        />
      </StickyContext>
    );

    const editorWithPreview = (
      <ScrollSync>
        <div className="nc-entryEditor-container">
          <SplitPane
            defaultSize="50%"
            onDragStarted={this.handleSplitPaneDragStart}
            onDragFinished={this.handleSplitPaneDragFinished}
            onChange={this.updateStickyContext}
          >
            <ScrollSyncPane>{editor}</ScrollSyncPane>
            <div className={classnames('nc-entryEditor-previewPane', { ['nc-entryEditor-blocker']: showEventBlocker })}>
              <PreviewPane
                collection={collection}
                entry={entry}
                fields={fields}
                fieldsMetaData={fieldsMetaData}
                getAsset={getAsset}
              />
            </div>
          </SplitPane>
        </div>
      </ScrollSync>
    );

    const editorWithoutPreview = (
      <div className="nc-entryEditor-noPreviewEditorContainer">
        {editor}
      </div>
    );

    return (
      <div className="nc-entryEditor-root">
        { collectionPreviewEnabled && this.state.previewVisible ? editorWithPreview : editorWithoutPreview }
        <div className="nc-entryEditor-footer">
          <Toolbar
            isPersisting={entry.get('isPersisting')}
            onPersist={this.handleOnPersist}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
            showDelete={showDelete}
            enableSave={enableSave}
          />
        </div>
      </div>
    );
  }
}

EntryEditor.propTypes = {
  collection: ImmutablePropTypes.map.isRequired,
  entry: ImmutablePropTypes.map.isRequired,
  fields: ImmutablePropTypes.list.isRequired,
  fieldsMetaData: ImmutablePropTypes.map.isRequired,
  fieldsErrors: ImmutablePropTypes.map.isRequired,
  getAsset: PropTypes.func.isRequired,
  onAddAsset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onPersist: PropTypes.func.isRequired,
  enableSave: PropTypes.bool.isRequired,
  showDelete: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRemoveAsset: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
};

export default EntryEditor;

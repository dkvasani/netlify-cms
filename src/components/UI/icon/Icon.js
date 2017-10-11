import React from 'react';


const availableIcons = [
  // Font Awesome Editor Icons
  'bold', 'italic', 'list', 'font', 'text-height', 'text-width', 'align-left', 'align-center', 'align-right',
  'align-justify', 'indent-left', 'indent-right', 'list-bullet', 'list-numbered', 'strike', 'underline', 'table',
  'superscript', 'subscript', 'header', 'h1', 'h2', 'h3', 'paragraph', 'link', 'unlink', 'quote-left', 'quote-right', 'code',
  'picture', 'video',
  // Entypo
  'note', 'note-beamed',
  'music',
  'search',
  'flashlight',
  'mail',
  'heart', 'heart-empty',
  'star', 'star-empty',
  'user', 'users', 'user-add',
  'video-alt',
  'picture-alt',
  'camera',
  'layout',
  'menu',
  'check',
  'cancel', 'cancel-circled', 'cancel-squared',
  'plus', 'plus-circled', 'plus-squared',
  'minus', 'minus-circled', 'minus-squared',
  'help', 'help-circled',
  'info', 'info-circled',
  'back',
  'home',
  'link-alt',
  'attach',
  'lock', 'lock-open',
  'eye',
  'tag',
  'bookmark', 'bookmarks',
  'flag',
  'thumbs-up', 'thumbs-down',
  'download', 'upload', 'upload-cloud',
  'reply', 'reply-all', 'forward', 'quote',
  'code-alt',
  'export',
  'pencil',
  'feather',
  'print',
  'retweet',
  'keyboard',
  'comment',
  'chat',
  'bell',
  'attention',
  'alert',
  'vcard',
  'address',
  'location',
  'map',
  'direction',
  'compass',
  'cup',
  'trash',
  'doc', 'docs', 'doc-landscape', 'doc-text', 'doc-text-inv',
  'newspaper',
  'book', 'book-open',
  'folder',
  'archive',
  'box',
  'rss',
  'phone',
  'cog',
  'tools',
  'share',
  'shareable',
  'basket',
  'bag',
  'calendar',
  'login', 'logout',
  'mic', 'mute', 'sound', 'volume',
  'clock',
  'hourglass',
  'lamp',
  'light-down', 'light-up',
  'adjust',
  'block',
  'resize-full', 'resize-small',
  'popup',
  'publish',
  'window',
  'arrow-combo',
  'down', 'down-circled', 'down-open', 'down-open-mini', 'down-open-big', 'down-dir', 'down-bold', 'down-thin',
  'left', 'left-circled', 'left-open', 'left-open-mini', 'left-open-big', 'left-dir', 'left-bold', 'left-thin',
  'right', 'right-circled', 'right-open', 'right-open-mini', 'right-open-big', 'right-dir', 'right-bold', 'right-thin',
  'up', 'up-circled', 'up-open', 'up-open-mini', 'up-open-big', 'up-dir', 'up-bold', 'up-thin',
  'ccw',
  'cw',
  'arrows-ccw',
  'level-down', 'level-up',
  'shuffle',
  'loop',
  'switch',
  'play', 'stop', 'pause', 'record', 'to-end', 'to-start', 'fast-forward', 'fast-backward',
  'progress-0', 'progress-1', 'progress-2', 'progress-3',
  'target',
  'palette',
  'list', 'list-add',
  'signal',
  'trophy',
  'battery',
  'back-in-time',
  'monitor',
  'mobile',
  'network',
  'cd',
  'inbox',
  'install',
  'globe',
  'cloud', 'cloud-thunder',
  'flash',
  'moon',
  'flight',
  'paper-plane',
  'leaf',
  'lifebuoy',
  'mouse',
  'briefcase',
  'suitcase',
  'dot', 'dot-2', 'dot-3',
  'brush',
  'magnet',
  'infinity',
  'erase',
  'chart-pie', 'chart-line', 'chart-bar', 'chart-area',
  'tape',
  'graduation-cap',
  'language',
  'ticket',
  'water',
  'droplet',
  'air',
  'credit-card',
  'floppy',
  'clipboard',
  'megaphone',
  'database',
  'drive',
  'bucket',
  'thermometer',
  'key',
  'flow-cascade', 'flow-branch', 'flow-tree', 'flow-line', 'flow-parallel',
  'rocket',
  'gauge',
  'traffic-cone',
  'cc', 'cc-by', 'cc-nc', 'cc-nc-eu', 'cc-nc-jp', 'cc-sa', 'cc-nd', 'cc-pd', 'cc-zero', 'cc-share', 'cc-remix',
  'github', 'github-circled',
  'flickr', 'flickr-circled',
  'vimeo', 'vimeo-circled',
  'twitter', 'twitter-circled',
  'facebook', 'facebook-circled', 'facebook-squared',
  'gplus', 'gplus-circled',
  'pinterest', 'pinterest-circled',
  'tumblr', 'tumblr-circled',
  'linkedin', 'linkedin-circled',
  'dribbble', 'dribbble-circled',
  'stumbleupon', 'stumbleupon-circled',
  'lastfm', 'lastfm-circled',
  'rdio', 'rdio-circled',
  'spotify', 'spotify-circled',
  'qq',
  'instagrem',
  'dropbox',
  'evernote',
  'flattr',
  'skype', 'skype-circled',
  'renren',
  'sina-weibo',
  'paypal',
  'picasa',
  'soundcloud',
  'mixi',
  'behance',
  'google-circles',
  'vkontakte',
  'smashing',
  'sweden',
  'db-shape',
  'logo-db',
];

const iconPropType = (props, propName) => {
  if (props[propName]) {
    const value = props[propName];
    if (typeof value !== 'string' || availableIcons.indexOf(value) === -1) {
      return new Error(
        `Invalid type "${ value }" supplied to Icon Component.`
      );
    }
  }
};

const noop = function () {};

export default function Icon({ style, className = '', type, onClick = noop }) {
  return <span className={`nc-icon-root ${ styles(type) } ${ className }`} style={style} onClick={onClick} />;
}

Icon.propTypes = {
  type: iconPropType,
};

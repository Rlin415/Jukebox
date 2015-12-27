(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Jukebox = require('./jukebox.js');

ReactDOM.render(React.createElement(Jukebox, null), document.getElementById('content'));

},{"./jukebox.js":2}],2:[function(require,module,exports){
var SearchSoundCloud = require('./searchSoundCloud.js');
var Tracklist = require('./tracklist.js');
var Playlist = require('./playlist.js');

module.exports = React.createClass({
  displayName: 'exports',

  getInitialState: function () {
    return { data: [], queue: [] };
  },
  handleSearchClick: function (tracks) {
    // TODO: set state to tracks
    this.setState({ data: tracks.data, queue: this.state.queue });
  },
  handleSongClick: function (song) {
    this.state.queue.unshift(song);
    this.setState({ data: this.state.data, queue: this.state.queue });
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'jukebox text-center container' },
      React.createElement(SearchSoundCloud, { onSearchClick: this.handleSearchClick }),
      React.createElement(Tracklist, { data: this.state.data, onSongClick: this.handleSongClick }),
      React.createElement(Playlist, { queue: this.state.queue })
    );
  }
});

},{"./playlist.js":3,"./searchSoundCloud.js":4,"./tracklist.js":6}],3:[function(require,module,exports){
module.exports = React.createClass({
  displayName: 'exports',

  render: function () {
    var songNodes = this.props.queue.map(function (song) {
      return React.createElement(
        'div',
        { className: 'song', key: song.id },
        song.title
      );
    });
    return React.createElement(
      'div',
      { className: 'playList' },
      React.createElement(
        'h4',
        null,
        ' Playlist '
      ),
      songNodes
    );
  }
});

},{}],4:[function(require,module,exports){
module.exports = React.createClass({
  displayName: 'exports',

  getInitialState: function () {
    return { text: '' };
  },
  handleTextChange: function (e) {
    this.setState({ text: e.target.value });
  },
  handleClick: function (e) {
    var searchSoundCloud = this;
    SC.get('/tracks', { genres: this.state.text }).then(function (tracks) {
      if (!tracks.length) {
        alert('No songs match that genre!');
        return;
      }
      searchSoundCloud.props.onSearchClick({ data: tracks });
    });
    this.setState({ text: '' });
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'input-group searchSoundCloud' },
      React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Search for song...',
        value: this.state.text, onChange: this.handleTextChange
      }),
      React.createElement(
        'span',
        { className: 'input-group-btn' },
        React.createElement(
          'button',
          { className: 'btn btn-default', type: 'button', onClick: this.handleClick },
          'Go!'
        )
      )
    );
  }
});

},{}],5:[function(require,module,exports){
module.exports = React.createClass({
  displayName: 'exports',

  handleClick: function () {
    var track_url = this.props.song.permalink_url;
    this.props.onSongClick(this.props.song);
    SC.stream('/tracks/' + this.props.song.id).then(function (player) {
      player.play();
    });
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'track', onClick: this.handleClick },
      React.createElement('img', { className: 'img-thumbnail', src: this.props.song.artwork_url, alt: 'cover photo' }),
      React.createElement(
        'h4',
        { className: 'trackArtist' },
        this.props.song.title
      )
    );
  }
});

},{}],6:[function(require,module,exports){
var Track = require('./track.js');

module.exports = React.createClass({
  displayName: 'exports',

  handleSongClick: function (song) {
    this.props.onSongClick(song);
  },
  render: function () {
    var trackList = this;
    var trackNodes = this.props.data.map(function (track) {
      return React.createElement(Track, { song: track, onSongClick: trackList.handleSongClick, key: track.id });
    });
    return React.createElement(
      'div',
      { className: 'trackList' },
      trackNodes
    );
  }
});

},{"./track.js":5}]},{},[1]);

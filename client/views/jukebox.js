var SearchSoundCloud = require('./searchSoundCloud.js');
var Tracklist = require('./tracklist.js');
var Playlist = require('./playlist.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {data: [], queue: []};
  },
  handleSearchClick: function(tracks) {
    this.setState({data: tracks.data, queue: this.state.queue});
  },
  handleSongClick: function(song) {
    this.state.queue.unshift(song);
    this.setState({data: this.state.data, queue: this.state.queue});
  },
  render: function() {
    return (
      <div className='jukebox text-center container'>
        <SearchSoundCloud onSearchClick={this.handleSearchClick} />
        <Tracklist data={this.state.data} onSongClick={this.handleSongClick} />
        <Playlist queue={this.state.queue} />
      </div>
    );
  }
});

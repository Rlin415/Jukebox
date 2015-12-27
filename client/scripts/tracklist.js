var Track = require('./track.js');

module.exports = React.createClass({
  handleSongClick: function(song) {
    this.props.onSongClick(song);
  },
  render: function() {
    var trackList = this;
    var trackNodes = this.props.data.map(function(track) {
      return (
        <Track song={track} onSongClick={trackList.handleSongClick} key={track.id}></Track>
      );
    });
    return (
      <div className='trackList'>
        {trackNodes}
      </div>
    );
  }
});

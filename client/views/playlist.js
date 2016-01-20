module.exports = React.createClass({
  render: function() {
    var songNodes = this.props.queue.map(function(song) {
      return (
        <div className='song' key={song.id}>
          {song.title}
        </div>
      );
    });
    return (
      <div className='playList'>
        <h4> Playlist </h4>
        {songNodes}
      </div>
    );
  }
});

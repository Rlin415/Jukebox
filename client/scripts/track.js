module.exports = React.createClass({
  handleClick: function() {
    var track_url = this.props.song.permalink_url;
    this.props.onSongClick(this.props.song);
    SC.stream('/tracks/' + this.props.song.id).then(function(player) {
      player.play();
    });
  },
  render: function() {
    return (
      <div className='track' onClick={this.handleClick}>
        <img className='img-thumbnail' src={this.props.song.artwork_url} alt='cover photo' />
        <h4 className='trackArtist'>
          {this.props.song.title}
        </h4>
      </div>
    );
  }
});

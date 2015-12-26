var TrackContainer = React.createClass({
  getInitialState: function() {
    return {data: [], queue: []};
  },
  handleSearchClick: function(tracks) {
    // TODO: set state to tracks
    this.setState({data: tracks.data, queue: this.state.queue});
  },
  handleSongClick: function(song) {
    this.state.queue.unshift(song);
    this.setState({data: this.state.data, queue: this.state.queue});
  },
  render: function() {
    return (
      <div className='trackContainer text-center container'>
        <TrackSearch onSearchClick={this.handleSearchClick} />
        <TrackList data={this.state.data} onSongClick={this.handleSongClick} />
        <Playlist queue={this.state.queue} />
      </div>
    );
  }
});

var TrackSearch = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleClick: function(e) {
    var trackSearch = this;
    SC.get('/tracks', {genres: this.state.text}).then(function(tracks) {
      if (!tracks.length) {
        alert('No songs match that genre!');
        return;
      }
      trackSearch.props.onSearchClick({data: tracks});
    });
    this.setState({text: ''});
  },
  render: function() {
    return (
      <div className='input-group trackSearch'>
        <input type='text' className='form-control' placeholder='Search for song...'
          value={this.state.text} onChange={this.handleTextChange}
        />
        <span className='input-group-btn'>
          <button className='btn btn-default' type='button' onClick={this.handleClick}>Go!</button>
        </span>
      </div>
    );
  }
});

var TrackList = React.createClass({
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

var Track = React.createClass({
  handleClick: function() {
    var track_url = this.props.song.permalink_url;
    this.props.onSongClick(this.props.song);
    console.log(this.props.song);
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

var Playlist = React.createClass({
  render: function() {
    var songNodes = this.props.queue.map(function(song) {
      return (
        <div className='song' key={song.id}>
          {song.title}
        </div>
      );
    });
    return (
      <div className='playerList'>
        <h4> Playlist </h4>
        {songNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <TrackContainer />,
  document.getElementById('content')
);

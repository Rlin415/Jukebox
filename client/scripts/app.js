var TrackContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  handleSearchClick: function(tracks) {
    // TODO: set state to tracks
    this.setState(tracks);
  },
  render: function() {
    return (
      <div className='trackContainer'>
        <TrackSearch onSearchClick={this.handleSearchClick} />
        <TrackList data={this.state.data} />
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
  render: function() {
    var trackNodes = this.props.data.map(function(track) {
      return (
        <Track title={track.title} image={track.artwork_url}></Track>
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
  handleClick: function(e) {

  },
  render: function() {
    return (
      <div className='track' onClick={this.handleClick}>
        <img src={this.props.image} alt='cover photo' />
        <h4 className='trackArtist'>
          {this.props.title}
        </h4>
      </div>
    );
  }
});

ReactDOM.render(
  <TrackContainer />,
  document.getElementById('content')
);

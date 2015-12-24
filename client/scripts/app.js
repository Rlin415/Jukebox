var TrackContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className='trackContainer'>
        <h2> List of songs matching your request </h2>
        <TrackList data={this.state.data} />
      </div>
    );
  }
});

var TrackList = React.createClass({
  render: function() {
    var trackNodes = this.props.data.map(function(track) {
      return (
        <Track title={track.title}></Track>
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
  render: function() {
    return (
      <div className='track'>
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

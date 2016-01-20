module.exports = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleClick: function(e) {
    var searchSoundCloud = this;
    SC.get('/tracks', {genres: this.state.text}).then(function(tracks) {
      if (!tracks.length) {
        alert('No songs match that genre!');
        return;
      }
      searchSoundCloud.props.onSearchClick({data: tracks});
    });
    this.setState({text: ''});
  },
  render: function() {
    return (
      <div className='input-group searchSoundCloud'>
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

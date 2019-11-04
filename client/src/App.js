import React from 'react';
import logo from './logo.svg';
import './App.css';
import NowPlaying from './NowPlaying.js';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }
  componentDidMount() {
    this.interval = setInterval(() => this.getNowPlaying(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <a className = "App-link" href='http://localhost:8888' >{this.state.loggedIn ? " " : "Login to Spotify"}</a>
          <NowPlaying nowPlaying={this.state.nowPlaying}/>
        </header>
      </div>
    );
  }
}

export default App;

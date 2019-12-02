  import React from 'react';
  import logo from './logo.svg';
  import './App.css';
  import NowPlaying from './NowPlaying.js';
  import NextSong from './NextSong.js'
  import AboutSong from './AboutSong.js'
  import Graph from './Graph.js'
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
        nowPlaying: { name: 'Not Checked', albumArt: '' },
        item: {},
        trackFeature: {},
        currencies: [
          {
            currencyName: 'Bitcoin',
            marketCap: 106330074359
          },
          {
            currencyName: 'Ethereum',
            marketCap: 32402945322
          },
          {
            currencyName: 'XRP',
            marketCap: 11864383092
          },
          {
            currencyName: 'Bitcoin Cash',
            marketCap: 9612908814
          },
          {
            currencyName: 'EOS',
            marketCap: 4644155391
          },
          {
            currencyName: 'Stellar',
            marketCap: 4084424747
          }
        ]
      }
    }
    nextSong(){
      spotifyApi.skipToNext()
      .then(result => {
        console.log(result)
      }).catch(e => {
        console.log("next")
      })
    }
    previousSong(){
      spotifyApi.skipToPrevious()
      .then(result => {
        console.log(result)
      }).catch(e => {
        console.log("prev")
      })
    }
    playPause(){
      spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
        if (response !== undefined){
          // spotifyApi.getArtistAlbums(response.item.artists[0].id)
          // .then(function(data) {
          //   console.log('Artist albums', data);
          // }, function(err) {
          //   console.error(err);
          // });
          if(response.is_playing){
            spotifyApi.pause()
            .then(result => {
              console.log(result)
            }).catch(e => {
              console.log("pause")
            })
          }else{
            spotifyApi.play()
            .then(result => {
              console.log(result)
            }).catch(e => {
              console.log("play")
            })
          }
        }}).catch(err => {
          console.log("newPlay")
        })
    }
    getNowPlaying(){
      spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
        if (response.item !== undefined){
          this.setState({
            nowPlaying: { 
                name: response.item.name, 
                albumArt: response.item.album.images[0].url,
              },
            item: response.item
          })
          spotifyApi.getAudioFeaturesForTrack(response.item.id)
          .then(data => {
            this.setState({
              trackFeature: data
            })
          }, 
          function(err) {
            console.error(err);
          });
        };
        }).catch(err => {
          console.log("nowplay")
        })
    }
    // trackFeature(){
    //   spotifyApi.getAudioFeaturesForTrack(this.state.item.id)
    //     .then(data => {
    //       this.setState({
    //         trackFeature: data
    //       })
    //     }, 
    //     function(err) {
    //       console.error(err);
    //     });
    // }
    componentDidMount() {
      this.interval = setInterval(() => this.getNowPlaying(), 3000);
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
            <NextSong nextSong={this.nextSong} previousSong={this.previousSong} playPause={this.playPause}/>
            <AboutSong item={this.state.trackFeature}/>
          </header>
          <Graph 
              item={this.state.trackFeature} 
              graphTitle="Top 6 Cryptocurrencies by Market Capitalization(%)"
            />
        </div>
      );
    }
  }

  export default App;

import React from "react"

class NowPlaying extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <div>{ this.props.nowPlaying.name }</div>
                <img src={this.props.nowPlaying.albumArt} style={{ height: 150 }}/>
            </div>
        )
    }
}

export default NowPlaying;
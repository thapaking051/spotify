import React from "react"

class NextSong extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <button onClick={this.props.previousSong}>
                {"<"}|
                </button>
                <button onClick={this.props.playPause}>
                    ||
                </button>
                <button onClick={this.props.nextSong}>
                    |>
                </button>
            </div>
        )
    }
}

export default NextSong
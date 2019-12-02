import React from "react"
import Line from "./Line.js"

class AboutSong extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            danceability: 0
        }
    }
    render(){
        let width= "10%";
        return(
            <div>
                <p>{this.props.item.danceability}</p>
                <div className="Graph">
                    <div style={{display: "inline-block", backgroundColor: "black", height:"100%", padding: "10px", borderRight: "1px solid red"}}>
                        <p>danceability: {this.props.item.danceability}</p>
                        <p>energy: {this.props.item.energy}</p>
                    </div>
                    <Line left= "0" top="90%" width="100%" height="1px"/>
                </div>
            </div>
        )
    }
}

export default AboutSong
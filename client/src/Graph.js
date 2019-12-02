import React from "react"

class Graph extends React.Component {
    state = {
      features: ["danceability", "acousticness", "energy", "liveness"]
    }
  
     renderLines() {
      return Array(10).fill(null).map((el, i) => (
        <Line 
          left={i * 10} 
          key={i}
        />
      ))
    }
    renderBars() {
        return (
            [<Bar 
                percent= {(this.props.item.danceability * 100) / 0.9}
            />, 
            <Bar 
                percent= {(this.props.item.energy * 100) / 0.9}
            />]
        )
    }
  
    render() {
      let planet = this.state.features.map(data => {
        return(
          <BarTextContent currencies = {data} />
        )
      })
      let planet2 = this.state.features.map(data => {
        return(
          <Bar percent= {(this.props.item.data * 100) / 0.9}/>
        )
      })
      return (
        <div className="graph-wrapper">
          <h2> { this.props.graphTitle } </h2>
          
          <div className="graph">
            <div className="bar-text-content">
              {planet}
            </div>
            <div className="bar-lines-container">
              { this.renderLines() }
              {planet2}
            </div>
            
            <div style={{ width: '12%' }} />
            <Markers />      
          </div>
          
        </div>
      )
    }
  }
  
  const Markers = () => {
    const markerArr = Array(11).fill(null);
    
    return (
      <div className="markers">
        {
          markerArr.map((el, i) => (
           <span className="marker" style={{ left: `${i * 10}%` }}>
            { i * 10 }
           </span>
          ))
        }
      </div>
    )
  }
  
  const Bar = ({ percent }) => {
    return (
      <div className="bar" style={{ width: `${percent}%` }} />
    )
  }
  
  const BarTextContent = ({ currencies }) => {
    return (
        <div className="text">
            {currencies}
        </div>
    )
  }
  
  const Line = ({ left }) => {
    return (
      <div 
        className="line" 
        style={{ left: `${left}%` }}
      />
    )
  }

export default Graph
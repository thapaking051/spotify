import React from "react"
class Graph extends React.Component {
    state = {}
  
     renderLines() {
      return Array(10).fill(null).map((el, i) => (
        <Line 
          left={i * 10} 
          key={i}
        />
      ))
    }
  
    renderBars() {
    //   const { currencies } = this.props;
      
    //   let sumOfAllCurrencies = currencies.reduce((acc, currency) => {
    //     return acc + currency.marketCap;
    //   }, 0);
      
    //   return currencies.map((currency) => {
    //     const percent = (currency.marketCap / sumOfAllCurrencies) * 100; 
    //     return (
    //       <Bar 
    //         percent={percent}
    //         key={currency.currencyName}
    //       />
    //     )
    //   });
        return (
            <Bar 
                percent= {(this.props.item.danceability * 100) / 0.9}
            />
        )
    }
  
    render() {
      return (
        <div className="graph-wrapper">
          <h2> { this.props.graphTitle } </h2>
          
          <div className="graph">
            <BarTextContent currencies={this.props.currencies} />
            
            <div className="bar-lines-container">
              { this.renderLines() }
              { this.renderBars() }
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
      <div className="bar-text-content">
        {/* {
          currencies.map((currency) => (
            <div className="text">
              {currency.currencyName }
            </div>
          ))
        } */}
        <div className="text">
            danceability
        </div>
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
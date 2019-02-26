import React from 'react'
// import Plotly from 'plotly.js'
import outline from './outline.js'
var Plotly = require('plotly.js');
var trace2 = {
    x:outline.x,
    y:outline.y,
    connectgaps: false, 
    line: {
      color: 'rgb(0, 0, 0)', 
      shape: 'linear', 
      width: 0.5
    }, 
    name: 'Coast', 
    type: 'scatter', 
    uid: 'ab28ff'
};
class Plotlysecond extends React.Component{
    componentDidMount(){
        var data = [trace2];
        var layout = {
            autosize: true, 
            height: 788, 
            legend: {
              x: 0.946022727273, 
              y: 1.15460526316
            }, 
            paper_bgcolor: 'rgb(217, 217, 217)', 
            plot_bgcolor: 'rgb(255, 255, 255)', 
            title: 'Preassure at sea level. GFS data with 0.25deg res., Start time 00z 23/12/2015. Valid forecast time : 00z 26/12/2015 (UTC)', 
            width: 1620, 
            xaxis: {
              autorange: true, 
              gridwidth: 1.2, 
              range: [-180.375, 180], 
              showline: false, 
              title: 'Longitude', 
              type: 'linear', 
              zeroline: false
            }, 
            yaxis: {
              autorange: true, 
              gridwidth: 1.2, 
              range: [-94.6171629444, 93.0080959444], 
              showline: false, 
              title: 'Latitude', 
              type: 'linear', 
              zeroline: false
            }
          };
        Plotly.plot("map", data, layout); //{showSendToCloud: false});// {staticPlot: true})
    }
    render(){
        return(
            <div id="map" style={{width:'1000px',height:'800px'}} ></div>
        )
    }
}

export default Plotlysecond
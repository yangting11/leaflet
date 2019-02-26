import React from 'react'
// import Plotly from 'plotly.js'
import outline from './outline.js'
import heatmap from './heatmap.js'
import river from './river.js'
import countries from './countries.js'
import river2 from './river2.js'
var Plotly = require('plotly.js');
trace1 = {
    x:heatmap.x,
    y:heatmap.y,
    z:heatmap.z,
    autocolorscale: false, 
    colorscale: [['0', 'rgb(150,0,90)'], ['0.125', 'rgb(0, 0, 200)'], ['0.25', 'rgb(0, 25, 255)'], ['0.375', 'rgb(0, 152, 255)'], ['0.5', 'rgb(44, 255, 150)'], ['0.625', 'rgb(151, 255, 0)'], ['0.75', 'rgb(255, 234, 0)'], ['0.875', 'rgb(255, 111, 0)'], ['1', 'rgb(255, 0, 0)']], 
    name: 'Preassure at sea level[hPa]', 
    type: 'heatmap', 
    uid: 'aa6279', 
    zauto: true, 
    zmax: 1042.16, 
    zmin: 951.17, 
    zsmooth: 'best'
  };
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
trace3 = {
      x:river.x,
      y:river.y,
      line: {
      color: 'rgb(31, 119, 180)', 
      width: 0.5
    }, 
    name: 'Rivers', 
    type: 'scatter', 
    uid: '42fdad', 
    visible: true
  };

  trace4 = {
      x:countries.x,
      y:countries.y,
      line: {
      color: 'rgb(0, 0, 0)', 
      dash: 'solid', 
      width: 0.5
    }, 
    name: 'Countries', 
    type: 'scatter', 
    uid: '6692a6'
  };
  trace5 = {
    x:river2.x,
    y:river2.y,
    line: {
      color: 'rgb(31, 119, 180)', 
      width: 0.5
    }, 
    name: 'Rivers2', 
    type: 'scatter', 
    uid: 'd69961'
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
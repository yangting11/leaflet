import React from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/dist/echarts.min.js'

var noise = getNoiseHelper();
var xData = [];
var yData = [];
var pp = [4.5,3.4,3.5,3.8,3.7,4.0,4.1,3.0]
// noise.seed(Math.random()); 
function generateData(theta, min, max) {
    var data = [];
    for (var i = 0; i <= 60; i++) {  //设置格子数
        for (var j = 0; j <= 30; j++) {
            // var x = (max - min) * i / 200 + min;
            // var y = (max - min) * j / 100 + min;
            // let val = noise.perlin2(i / 40, j / 20) + 3
            // console.log(val)
            data.push([i, j, pp[Math.floor(Math.random()*8)]]);
            // data.push([i, j, normalDist(theta, x) * normalDist(theta, y)]);
        }
        xData.push(i);
    }
    for (var j = 0; j < 30; j++) {
        yData.push(j);
    }
    return data;
}
var data = generateData(2, -5, 5);

function getNoiseHelper(global) {

    var module = {};
  
    function Grad(x, y, z) {
      this.x = x; this.y = y; this.z = z;
    }
  
    Grad.prototype.dot2 = function(x, y) {
      return this.x*x + this.y*y;
    };
  
    Grad.prototype.dot3 = function(x, y, z) {
      return this.x*x + this.y*y + this.z*z;
    };
  
    var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                 new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                 new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];
  
    var p = [151,160,137,91,90,15,
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    // To remove the need for index wrapping, double the permutation table length
    var perm = new Array(512);
    var gradP = new Array(512);

    // This isn't a very good seeding function, but it works ok. It supports 2^16
    // different seed values. Write something better if you need more seeds.
    module.seed = function(seed) {

      if(seed > 0 && seed < 1) {
        // Scale the seed out
        seed *= 65536;
      }
      seed = Math.floor(seed);
      if(seed < 256) {
        seed |= seed << 8;
      }
  
      for(var i = 0; i < 256; i++) {
        var v;
        // if (i & 1) {
          v = p[i] ^ (seed & 255);
        // } else {
        //   v = p[i] ^ ((seed>>8) & 255);
        // }
  
        perm[i] = perm[i + 256] = v;
        gradP[i] = gradP[i + 256] = grad3[v % 12];
      }
      console.log('perm',perm);
      console.log('gradp',gradP)
    };
  
    module.seed(0);
    
    function fade(t) {
      return t*t*t*(t*(t*6-15)+10);
    }
  
    function lerp(a, b, t) {
      return (1-t)*a + t*b;
    }
    // 2D Perlin Noise
    module.perlin2 = function(x, y) {
      var X = Math.floor(x), Y = Math.floor(y);
      x = x - X; y = y - Y;
      X = X & 255; Y = Y & 255;
      var n00 = gradP[X+perm[Y]].dot2(x, y);
      var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
      var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
      var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);
  
    //   var n00 = 100;
    //   var n01 = 80;
    //   var n10 = 70;
    //   var n11 = 60;

      // Compute the fade curve value for x
      var u = fade(x);
  
      // Interpolate the four results
      return lerp(
          lerp(n00, n10, u),
          lerp(n01, n11, u),
         fade(y));
    };
    
    return module;
  }



class Echart extends React.Component{
    getOption(){
        console.log('yData',yData)
        console.log('xData',xData)
        console.log('Data',data)
        let option = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: [{
                type: 'value',
                name:'左岸',
                max:30,
                min:0,
                data:yData
            },{
                name:'右岸',
                type: 'value',
                max:30,
                min:0,
                data:yData,
            }],
            visualMap: {
                min: 2.5,
                max: 5,
                calculable: true,
                realtime: false,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                }
            },
            series: [{
                name: '等高线',
                type: 'heatmap',
                yAxisIndex: 0,
                data: data,
                itemStyle: {
                    emphasis: {
                        borderColor: '#333',
                        borderWidth: 1
                    }
                },
                progressive: 1000,
                animation: false
            }]
        };
        return option        
    }
    render(){
        return(
            <div className="equalHeight">
                echart页面
                <ReactEchartsCore
                style={{height:'400px',width:'800px'}}
                echarts={echarts}
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
                // onChartReady={this.onChartReadyCallback}
                // onEvents={EventsDict}
                // opts={}
                />
            </div>
        )
    }
}
export default Echart
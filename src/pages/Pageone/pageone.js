import React, {Component} from 'react'
import $ from 'jquery'
import './pageone.scss'
import L from 'leaflet'
import '../../assets/js/leaflet.ChineseTmsProviders'
import 'leaflet/dist/leaflet.css'
var map;
let myIcon = L.icon({
    iconUrl: require('../../assets/images/zpc1.png'),
    iconSize: [26, 26]
});
var option = {
    action:{
        satellite:{
            name:'GaoDe.Normal.Map',
            style:{
                maxZoom: 18,
                minZoom: 1
            }
        },
        terrain:{
            name:'GaoDe.Satellite.Map',
            style:{
                maxZoom: 18,
                minZoom: 11
            }
        }
    }
}

let satellite = L.tileLayer.chinaProvider(option.action.satellite.name,option.action.satellite.style)
let terrain = L.tileLayer.chinaProvider(option.action.terrain.name,option.action.terrain.style);
// let traffic = L.tileLayer.chinaProvider(option.action.traffic.name,option.action.traffic.style);
class Pageone extends Component{
    state={  
        layer:terrain,
        flagselect:true,
        selected:{
            img1:require('../../assets/images/googlemap1.png')
        },
        select:{
            googlemap1:{
                img:require('../../assets/images/googlemap1.png')
            },
            googlemap2:{
                img:require('../../assets/images/googlemap2.png')
            }
        }
    }
    componentDidMount(){
        map = L.map("map", {
            center: [29.795168,121.20792],
            zoom: 12,
            layers: this.state.layer,
            zoomControl: false
        });
        let arrtest = [
            {
                latlng:[29.795168,121.20792],
                name:'测试地点1'
            },
            {
                latlng:[29.795168,121.21893],
                name:'测试地点2'
            },
            {
                latlng:[29.765138,121.293],
                name:'测试地点3'
            },
            {
                latlng:[29.715468,121.2893],
                name:'测试地点4'
            },
            {
                latlng:[29.725968,121.2193],
                name:'测试地点5'
            },
            {
                latlng:[29.528,121.218],
                name:'测试地点6'
            },
            {
                latlng:[29.858,121.2193],
                name:'测试地点7'
            },
            {
                latlng:[29.7168,121.2893],
                name:'测试地点8'
            },
            {
                latlng:[29.851,121.212893],
                name:'测试地点9'
            },
            {
                latlng:[29.78,121.21833],
                name:'测试地点10'
            },
            {
                latlng:[29.168,121.21293],
                name:'测试地点11'
            }
        ]
        var mouseoveri = -1;
        for(let i=0;i<arrtest.length;i++){
            let marker =  L.marker(arrtest[i].latlng, {icon: myIcon}).addTo(map).bindTooltip(arrtest[i].name, {className: "myCSSClass myCSSClass"+i,permanent: true, direction:'center'}).openTooltip();
            marker.on('mouseover', function (e) {
                console.log(e.latlng)
                for(let j=0;j<arrtest.length;j++){
                    if(e.latlng.lat == arrtest[j].latlng[0] && e.latlng.lng == arrtest[j].latlng[1]){
                        mouseoveri = j;
                    }
                }
                $(".myCSSClass"+mouseoveri).addClass("hoveritem");
            });
            marker.on('mouseout', function (e) {
                $(".myCSSClass").removeClass("hoveritem");
            });
        }
    }
    changestatus(e){
        this.setState({
            flagselect:false
        })
    }
    changeselected(e,value,layer){
        map.removeLayer(this.state.layer)
        map.addLayer(layer)
        let newselected = this.state.selected;
        console.log(this.state.select[value].img)
        newselected.img = this.state.select[value].img
        let newlayer = this.state.layer;
        newlayer = layer
        this.setState({
            flagselect:true,
            selected:newselected,
            layer:newlayer
        })
    }
    render(){
        return(
            <div className="pageone">
                <div id="map"></div>
                <div className="changemap" style={{position:'absolute',bottom:'20px',right:'10px',zIndex:999,textAlign:'right'}}>
                    {this.state.flagselect?<div className="selected" style={{border:'2px solid #347ebc'}}>
                        <img src={this.state.selected.img} style={{width:'80px',height:'80px'}} onClick={e=>{this.changestatus(e)}}/>
                    </div>:<div className="select">
                        <li style={{width:'80px',height:'80px'}}>
                            <img src={this.state.select.googlemap1.img} style={{width:'80px',height:'80px'}} onClick={e=>this.changeselected(e,'googlemap1',satellite)}/>
                            <p>街道图</p>
                        </li>
                        <li style={{width:'80px',height:'80px'}}>
                            <img src={this.state.select.googlemap2.img} style={{width:'80px',height:'80px'}} onClick={e=>this.changeselected(e,'googlemap2',terrain)}/>
                            <p>影像图</p>
                        </li>
                    </div>
                    }                    
                </div>
            </div>
        )
    }
}

export default Pageone
import React, {Component} from 'react'
import './pageone.scss'
import L from 'leaflet'
import '../../assets/js/leaflet.ChineseTmsProviders'
import 'leaflet/dist/leaflet.css'
var map;
var option = {
    action:{
        satellite:{
            name:'GaoDe.Normal.Map',
            style:{
                maxZoom: 18,
                minZoom: 11
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
            center: [31.59, 120.29],
            zoom: 12,
            layers: this.state.layer,
            zoomControl: false
        });
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
                    {this.state.flagselect?<div className="selected">
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
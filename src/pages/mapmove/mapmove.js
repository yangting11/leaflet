import React from 'react'
import L from 'leaflet'
import '../../assets/js/leaflet.ChineseTmsProviders'
import 'leaflet/dist/leaflet.css'
import './mapmove.scss'
import {Row,Col} from 'antd'
var map1,map2;
let markarr = [
    {lat:29.795168,lng:121,text:'第一个marker'},
    {lat:29.795168,lng:121.20792,text:'第二个marker'},
    {lat:29,lng:122,text:'第三个marker'},
    {lat:28.5,lng:121,text:'第四个marker'},
]
let myIcon={
    iconUrl: '/images/marker-icon.png',
    iconSize: [20, 30],
    iconAnchor: [0, 0],
    popupAnchor: [6, 0],
};
let satellite1 = L.tileLayer.chinaProvider('GaoDe.Normal.Map',{
    maxZoom: 18,
    minZoom: 1
})
let satellite2 = L.tileLayer.chinaProvider('GaoDe.Normal.Map',{
    maxZoom: 18,
    minZoom: 1
})
let attribution = '<span id="refdiv"></span> &copy; 2017 弘泰水利';
class Mapmove extends React.Component{
    componentDidMount(){
        // 地图生成一
        // map1 = L.map('map1').setView([51.505, -0.09], 13);
        // map2 = L.map('map2').setView([51.505, -0.09], 13);
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map1);
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map2);

        //地图生成二
        map1 = L.map("map1", {
            center: [29.795168,121.20792],
            zoom: 5,
            layers: satellite1,
            zoomControl: false
        });

        map2 = L.map("map2", {
            center: [29.795168,121.20792],
            zoom: 5,
            layers: satellite2,
            zoomControl: false
        });



        for(let i=0;i<markarr.length;i++){
            let marker = L.marker([markarr[i].lat,markarr[i].lng],{icon:L.icon(myIcon)}).addTo(map1).bindPopup(markarr[i].text)
            L.marker([markarr[i].lat,markarr[i].lng],{icon:L.icon(myIcon)}).addTo(map2).bindPopup(markarr[i].text)
        }
        // 将要联动的地图加入数组
        var maps = [map1,map2];
        //地图联动实现
        function maplink(e){
            var _this = this;
            maps.map(function (t) {
            t.setView(_this.getCenter(),_this.getZoom())
            })
        }
        //绑定
        maps.map(function (t) {
            t.on({drag:maplink,zoom:maplink})
        })
    }
    render(){
        return(
            <div className="mapmove">
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <div id="map1"></div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div id="map2"></div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Mapmove
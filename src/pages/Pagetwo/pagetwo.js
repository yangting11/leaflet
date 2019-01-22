import React, {Component} from 'react'
import L from 'leaflet'
import $ from 'jquery'
import statesData from '../../assets/js/us-states.js'
var map
let myIcon = L.icon({
    iconUrl: require('../../assets/images/zpc1.png'),
    iconSize: [26, 26]
});
class Pagetwo extends Component{
    componentDidMount(){
        map = L.map('map').setView([37.8, -96], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.geoJson(statesData).addTo(map);
        function getColor(d) {
            return d > 1000 ? '#800026' :
                   d > 500  ? '#BD0026' :
                   d > 200  ? '#E31A1C' :
                   d > 100  ? '#FC4E2A' :
                   d > 50   ? '#FD8D3C' :
                   d > 20   ? '#FEB24C' :
                   d > 10   ? '#FED976' :
                              '#FFEDA0';
        }
        function style(feature) {
            return {
                fillColor: getColor(feature.properties.density),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.5
            };
        }
        
        L.geoJson(statesData, {style: style}).addTo(map);

        let arrtest = [
            {
                latlng:[38.4, -98],
                name:'测试地点1'
            },
            {
                latlng:[36.4, -98],
                name:'测试地点2'
            },
            {
                latlng:[32.4, -90],
                name:'测试地点3'
            },
            {
                latlng:[30.4, -88],
                name:'测试地点4'
            },
            {
                latlng:[32.4, -80],
                name:'测试地点5'
            },
            {
                latlng:[32.4, -82],
                name:'测试地点6'
            },
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
    render(){
        return(
            <div className="pageone">
                <div id="map"></div>
            </div>
        )
    }
}

export default Pagetwo
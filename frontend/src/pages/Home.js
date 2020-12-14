import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Modal } from 'react-bootstrap';
import { NaverMap } from 'react-naver-maps';
import List from '../components/Map/List';
import * as request from '../lib/request';
import $ from "jquery";
var gridSize = 100;
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            show : false
        };
    }

    handleClose = () => this.setState({show:false});
    handleOpen = () => this.setState({show:true});

    render() {
        const navermaps = window.naver.maps;
        return (
            <Container>
                <NaverMap
                    mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
                    style={{
                        width: '100%',
                        height: '600px',
                    }}
                    defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
                    defaultZoom={15}
                    naverRef={ref => { this.mapRef = ref }}
                >
                </NaverMap>
                <Modal show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body style={{ 'max-height': '700px', 'overflow-y': 'scroll' }}><List data = {this.state.data}/></Modal.Body>
                </Modal>
            </Container>
        );
    }

    showTipsInMap(markers)
    {
        let mapRef = window.naver.maps;
        let instance = this.mapRef.instance;
        let t = [{position:new mapRef.LatLng(37.3595704, 127.105399)},{position:new mapRef.LatLng(37.3595700, 127.105399)},{position:new mapRef.LatLng(37.3595704, 127.105390)},{position:new mapRef.LatLng(37.3590704, 127.105399)}]
        
        if(!markers)
        {
            markers = [];

            for (let i = 0, ii = t.length; i < ii; i++) {
                let marker = new mapRef.Marker(t[i]);
                markers.push(marker);
            }
        }
        var htmlMarker1 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:30px;font-size:12px;color:black;text-align:center;font-weight:bold;background:url(/marker.png);background-size:contain;"></div>',
            size: mapRef.Size(40, 40),
            anchor: mapRef.Point(20, 20)
        };
        console.log(mapRef);
        new window.MarkerClustering({
            minClusterSize: 1,
            maxZoom: 22,
            map: instance,
            markers: markers,
            disableClickZoom: false,
            gridSize: gridSize,
            icons: [htmlMarker1],
            indexGenerator: [10],
            averageCenter: true,
            stylingFunction: function(clusterMarker, count) {
                $(clusterMarker.getElement()).find('div:first-child').text(count);
            }
        }, this.showTipsList.bind(this));
        console.log(this.showTipsList);
    }
    async showTipsList(location, zoomLevel)
    {
        console.log(location);
        console.log(zoomLevel);
        this.handleOpen();
        let result = await request.getBoardByTitle("", 1);
        this.setState({data:result.list});
    }

    componentDidMount() {
        
        let mapRef = window.naver.maps;
        let instance = this.mapRef.instance;
        var locationBtnHtml = '<a href="#" class="btn_mylct"><img width="30px" height="30px" src="./gps_marker.png"></a>';

        mapRef.Event.once(instance, 'init_stylemap', function () {
            //customControl 객체 이용하기
            var customControl = new mapRef.CustomControl(locationBtnHtml, {
                position: mapRef.Position.TOP_LEFT
            });
            customControl.setMap(instance);
            mapRef.Event.addDOMListener(customControl.getElement(), 'click', function () {
                var options = {
                    // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
                    // 그러나 이 기능은 배터리 지속 시간에 영향을 미친다. 
                    enableHighAccuracy: false, // 대략적인 값이라도 상관 없음: 기본값
                    
                    // 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자, 
                    // 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
                    maximumAge: 15000,     // 5분이 지나기 전까지는 수정되지 않아도 됨
                    
                    // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
                    // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
                    timeout: 15000    // 15초 이상 기다리지 않는다.
                }
                navigator.geolocation.getCurrentPosition(function (pos) {
                    let lat, lng;
                    lat = pos.coords.latitude;
                    lng = pos.coords.longitude;
                    
                    instance.setCenter(new mapRef.LatLng(lat, lng));
                }, (e)=>{console.log(e)}, options)
            });
        });
        this.setMyCurrentLocation();
        this.showTipsInMap(null)
    }
    setMyCurrentLocation () {
        let mapRef = window.naver.maps;
        let instance = this.mapRef.instance;
        var options = {
            // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
            // 그러나 이 기능은 배터리 지속 시간에 영향을 미친다. 
            enableHighAccuracy: false, // 대략적인 값이라도 상관 없음: 기본값
            
            // 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자, 
            // 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
            maximumAge: 15000,     // 5분이 지나기 전까지는 수정되지 않아도 됨
            
            // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
            // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
            timeout: 15000    // 15초 이상 기다리지 않는다.
        }
        navigator.geolocation.getCurrentPosition(function (pos) {
            let lat, lng;
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            
            instance.setCenter(new mapRef.LatLng(lat, lng));
        }, (e)=>{console.log(e)}, options)
    }
}

export default withRouter(Home);
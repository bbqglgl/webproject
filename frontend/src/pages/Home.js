import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Modal } from 'react-bootstrap';
import { NaverMap } from 'react-naver-maps';
import List from '../components/Map/List';
import * as request from '../lib/request';
import $ from "jquery";
var gridSize = 130;
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            show : false
        };
    }
    static t = null;
    handleClose = () => this.setState({show:false});
    handleOpen = () => this.setState({show:true});

    render() {
        return (
            <Container>
                <NaverMap
                    mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
                    style={{
                        width: '100%',
                        height: '600px',
                    }}
                    defaultCenter={{ lat:37.2830223, lng:127.0435122 }}
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
        if(!markers)
        {
            markers = [];
        }
        var htmlMarker1 = {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:30px;font-size:12px;color:black;text-align:center;font-weight:bold;background:url(/marker.png);background-size:contain;"></div>',
            size: mapRef.Size(40, 40),
            anchor: mapRef.Point(20, 20)
        };

        if(Home.t===null)
        {
            Home.t=new window.MarkerClustering({
                minClusterSize: 1,
                maxZoom: 22,
                map: instance,
                markers: markers,
                disableClickZoom: false,
                gridSize: gridSize,
                icons: [htmlMarker1],
                indexGenerator: [10],
                averageCenter: true,
                stylingFunction: function (clusterMarker, count) {
                    $(clusterMarker.getElement()).find('div:first-child').text(count);
                }
            }, this.showTipsList.bind(this));
        }
        else
        {
            Home.t.setMarkers(markers);
            Home.t._redraw();
        }
    }
    async showTipsList(location, zoomLevel)
    {
        console.log(location);
        console.log(zoomLevel);
        this.handleOpen();
        let result = await request.getTipsByGeo(location, zoomLevel);
        this.setState({data:result});
    }
    componentWillUnmount()
    {
        Home.t=null;
    }
    async componentDidMount() {
        
        let mapRef = window.naver.maps;
        let instance = this.mapRef.instance;
        var locationBtnHtml = '<a href="#" class="btn_mylct"><img width="30px" height="30px" src="./gps.png"></a>';

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
        
        mapRef.Event.addListener(instance, 'dragend', ()=>this.dragHandler(instance));
        //this.setMyCurrentLocation();
        let result = await request.getMarkerByGeo(instance.getCenter(), instance.getZoom());
        this.showTipsInMap(result);
    }
    async dragHandler(instance)
    {
        let result = await request.getMarkerByGeo(instance.getCenter(), instance.getZoom());
        this.showTipsInMap(result);
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
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {NaverMap, Marker} from 'react-naver-maps';

class Home extends Component {
    
    render() {
        const navermaps = window.naver.maps;
        return (
            <Container>
                  <NaverMap 
            mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
            style={{
              width: '100%',
              height: '400px',
            }}
            defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
            defaultZoom={10}
          >
                    <Marker 
        position={new navermaps.LatLng(37.3595704, 127.105399)}
        animation={navermaps.Animation.BOUNCE}
        onClick={() => {
          alert('여기는 네이버 입니다.')
        }}
      />
              </NaverMap>
            </Container>
        );
    }
}

export default withRouter(Home);
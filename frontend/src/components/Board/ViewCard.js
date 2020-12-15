import React, { Component } from 'react';
import { Container, Card, ListGroup, Image, Modal, Button } from 'react-bootstrap';
import { NaverMap, Marker } from 'react-naver-maps';

//본인이 쓴 글일경우 삭제 가능하게
class ViewCard extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            tip:null,
            show_pic_path: "",
            show_pic : false,
            show_map : false
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
         tip:nextProps.tip,
        };
       }
    handleMapClose = () => {this.setState({show_map : false})}
    handleMapOpen = () => {this.setState({show_map : true})}
    handlePicClose = () => {this.setState({show_pic : false})}
    handlePicOpen = (path) => {this.setState({show_pic : true, show_pic_path:path})}
    tipRender()
    {
        if(this.state.tip === null)
            return;
        return(
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>{this.state.tip.title}</Card.Title>
                <Card.Text>{this.state.tip.content}</Card.Text>
            </Card.Body>
            <ListGroup horizontal>
                {this.state.tip.media.map((img, i) => {
                    return(
                    <>
                        <ListGroup.Item style={{ width: '18rem' }}><Image src={'/images/'+img.path} onClick={() => this.handlePicOpen('/images/'+img.path)} style={{ width: '100%' }}  /></ListGroup.Item>
                    </>);
                })}
                </ListGroup>
                <Modal show={this.state.show_map} onHide={this.handleMapClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <NaverMap
                            mapDivId={'maps-getting-started-uncontrolledd'}
                            style={{
                                width: '100%',
                                height: '700px',
                            }}
                            defaultCenter={{ lat: this.state.tip.location.coordinates[1], lng: this.state.tip.location.coordinates[0] }}
                            defaultZoom={15}
                            naverRef={ref => { this.mapRef = ref }}
                        >
                            <Marker
                                position={new window.naver.maps.LatLng(this.state.tip.location.coordinates[1], this.state.tip.location.coordinates[0])}
                            />
                            {setTimeout( function() {window.dispatchEvent(new Event('resize'));}, 200)}
                        </NaverMap>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.show_pic} onHide={this.handlePicClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Image width="100%" src={this.state.show_pic_path} />
                    </Modal.Body>
                </Modal>
                {this.state.tip.location.coordinates[1] === 0 ? <Button variant="primary" type="submit" disabled="true">
                    위치
                </Button> :
            <Button variant="primary" type="submit" onClick={this.handleMapOpen}>
                    위치
                </Button>}
        </Card>
        );
    }
    render() {
        return (
            <>
                <Container>
                    {this.tipRender()}
                </Container>
            </>
        );
    }
}

export default ViewCard;
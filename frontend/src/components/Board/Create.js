import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Form, Image, Modal, Card, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { NaverMap, Marker } from 'react-naver-maps';
import $ from "jquery";
import bsCustomFileInput from 'bs-custom-file-input'

class Create extends Component {
    constructor(props) {
        super(props);
        
        this.form = {
            title: React.createRef(),
            content: React.createRef(),
            media: React.createRef()
        }
        this.state = {
            show : true,
            media:[],
            selectedLocation:null
        }
        this.form = {
            modal: React.createRef()
        }
        this.mapElement = (
            <NaverMap
                mapDivId={'maps-getting-started-uncontrolled'}
                style={{
                    width: '100%',
                    height: '700px',
                }}
                defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
                defaultZoom={15}
                naverRef={ref => { this.mapRef = ref }}
            >
            <img width="30px" height="30px" src="/marker.png" style={{position: 'absolute', 'z-index': '100', margin: '-30px 0 0 -15px', padding: '0px', 'pointer-events': 'none', 'left': '50%', top: '50%'}}/>
            </NaverMap>);
    }
    componentDidMount() {
        this.handleClose();
    }
    handleClose = () => {
        $(".modal-backdrop").attr('style', "display:none;");
        $(".modal").attr('style', "display: none; padding-left: 17px;");
    }
    handleOpen = () => {
        $(".modal-backdrop").attr('style', "display:block;");
        $(".modal").attr('style', "display: block; padding-left: 17px;");
        setTimeout( function() {window.dispatchEvent(new Event('resize'));}, 200);
    }

    selectLocation()
    {
        if(this.mapRef)
        {
            let result = this.mapRef.getCenter();
            this.handleClose();
            this.setState({selectedLocation:{ lat: result.y, lng: result.x }});
        }
        this.handleClose();
    }

    async submit() {
        const title = this.form.title.current.value;
        const content = this.form.content.current.value;
        //const media = this.form.media.current.value;
        //await this.props.onSubmit();
        this.props.history.push("/");
    }

    cancel() {
        this.props.history.goBack();
    }
    mediaChangeHandler = (e)=>
    {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({ media : [...this.state.media ,{ file: file, imagePreviewUrl: reader.result }] });
        };
        reader.readAsDataURL(file);
    }
    alertDeleteMedia(index)
    {
        console.log(this.state.media);
        if(window.confirm("삭제하시겠습니까??") === true)
        {
            this.mediaDeleteByIndex(index);
        }
    }
    mediaDeleteByIndex(index)
    {

        let temp = [];
        this.state.media.map(m => temp.push(m));
        temp.splice(index, 1);
        this.setState({media : temp});
    }
    render() {
        return (
            <>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="제목"
                        ref={this.form.title}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        as="textarea"
                        placeholder="내용을 입력해주세요."
                        ref={this.form.content}
                    />
                </InputGroup>

                    <div class="custom-file">
                        <input id="inputGroupFile02" type="file" multiple class="custom-file-input" onChange={this.mediaChangeHandler} />
                        <label for="inputGroupFile02">Choose several files</label>
                    </div>
                            <ListGroup horizontal>
                {this.state.media.map((img, i) => {
                    return(
                    <>
                                <ListGroup.Item style={{ width: '18rem' }}><Image src={img.imagePreviewUrl} style={{ width: '100%' }} onClick={() => this.alertDeleteMedia(i)} /></ListGroup.Item>
                    </>);
                })}
                </ListGroup>
                    <Modal id="CreateMapModal" size="lg" show={true} onHide={this.handleClose} ref={this.form.modal}>
                    <Modal.Header closeButton>
                        <Modal.Title>위치 선택하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.mapElement}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            닫기
                        </Button>
                        <Button variant="primary" onClick={this.selectLocation.bind(this)}>
                            위치 선택
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="primary" type="submit" onClick={this.handleOpen}>
                    위치
                </Button>
                <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>
                    Submit
                </Button>
                <Button variant="danger" type="submit" onClick={this.cancel.bind(this)}>
                    Cancel
                </Button>
            </>
        );
    }
}

export default withRouter(Create);
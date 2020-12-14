import React, { Component } from 'react';
import { InputGroup, FormControl, Button, Form, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
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
            media:[]
        }
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
          console.log(this.state.media);
        };
        reader.readAsDataURL(file);
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
                    {this.state.media.map(img => (<Image src={img.imagePreviewUrl} thumbnail />))}
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
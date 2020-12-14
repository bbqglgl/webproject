import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Create from '../components/Board/Create';
import * as request from '../lib/request';

class CreateTip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title:"",
            content:"",
            media:[]
        };
    }

    createNewTip(title, content, media)
    {
        
    }

    render() {
        return (
            <Container>
                <Create onSubmit={this.createNewTip} />
            </Container>
        );
    }
}

export default withRouter(CreateTip);
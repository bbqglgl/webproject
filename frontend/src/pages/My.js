import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Main from '../components/My/Main';

class My extends Component {
    render() {
        return (
            <Container>
                    <Main />
            </Container>
        );
    }
}

export default withRouter(My);
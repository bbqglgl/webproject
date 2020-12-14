import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import JoinForm from '../components/Auth/JoinForm';

class Join extends Component {
    render() {
        return (
            <Container>
                <JoinForm />
            </Container>
        );
    }
}

export default withRouter(Join);
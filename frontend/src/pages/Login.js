import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoginForm from '../components/Auth/LoginForm';

class Login extends Component {
    render() {
        return (
            <Container>
                    <LoginForm />
            </Container>
        );
    }
}

export default withRouter(Login);
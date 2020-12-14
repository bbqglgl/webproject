import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ErrorText: ''
        }
        this.form = {
            email: React.createRef(),
            password: React.createRef()
        }
    }
    ErrorText(text) {
        if (text === null || text === undefined || text.length === 0)
            return;
        return (
            <Alert variant="danger">
                {text}
            </Alert>
        );
    }
    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={this.form.email} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={this.form.password} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                {this.ErrorText(this.state.ErrorText)}
                <Button variant="primary" type="submit">
                    Submit
                    </Button>
                <Button variant="primary" type="submit">
                    Join
                    </Button>
            </Form>
        );
    }
}
export default LoginForm;
import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

class JoinForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ErrorText: '',
            passwordMsg: ''
        }
        this.form = {
            email: React.createRef(),
            password: React.createRef(),
            passwordAlert: React.createRef()
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
    checkConfirmPassword = (e) =>
    {
        if(e.target.value.length === 0)
            return;
        if(this.form.password.current.value !== e.target.value)
        {
            this.setState({passwordMsg : "비밀번호가 다릅니다. 확인해주세요."});
            return;
        }
        this.setState({passwordMsg : ""});
        return;
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
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.checkConfirmPassword}/>
                    <Form.Text className="text-muted">
                        {this.state.passwordMsg}
                    </Form.Text>
                </Form.Group>
                {this.ErrorText(this.state.ErrorText)}
                <Button variant="primary" type="submit">
                    Join
                    </Button>
            </Form>
        );
    }
}
export default JoinForm;
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import * as request from '../../lib/request';

class JoinForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ErrorText: '',
            passwordMsg: '',
            canJoin:false
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
            this.setState({passwordMsg : "비밀번호가 다릅니다. 확인해주세요.", canJoin:false});
            return;
        }
        this.setState({passwordMsg : "", canJoin:true});
        return;
    }
    async submit(e) {
        e.preventDefault();
        const email = this.form.email.current.value;
        const password = this.form.password.current.value;
        let msg = await request.join(email, password);
        
        if(msg === null)
            this.props.history.push("/");
        else
            alert(msg);
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
                <Button variant="primary" onClick={this.submit.bind(this)} disabled={!this.state.canJoin}>
                    Join
                    </Button>
            </Form>
        );
    }
}
export default withRouter(JoinForm);
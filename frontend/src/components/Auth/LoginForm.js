import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { local_login } from '../../actions/auth';
import * as request from '../../lib/request';

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
    async submit(e) {
        e.preventDefault();
        const email = this.form.email.current.value;
        const password = this.form.password.current.value;
        let msg = await request.Login(email, password);

        if(typeof(msg) !== "string")
        {
            this.props.local_login(msg.data._id, msg.data.email);
            console.log(this.props);
            this.props.history.push("/");
        }
        else
            alert(msg);
    }
    join()
    {
        this.props.history.push("/Auth/Join");
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
                <Button variant="primary" onClick={this.submit.bind(this)}>
                    로그인
                    </Button>
                <Button variant="primary" onClick={this.join.bind(this)}>
                    가입하기
                    </Button>
            </Form>
        );
    }
}
const mapStateToProps = state => { return state; };

const mapDispatchToProps = dispatch => ({
    local_login: (_id, email) => dispatch(local_login(_id, email)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
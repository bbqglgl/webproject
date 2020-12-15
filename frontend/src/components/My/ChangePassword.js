import React, { Component } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import * as request from '../../lib/request';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ErrorText: '',
            passwordMsg: ''
        }
        this.form = {
            oldPassword: React.createRef(),
            newPassword: React.createRef(),
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
        if(this.form.newPassword.current.value !== e.target.value)
        {
            this.setState({passwordMsg : "비밀번호가 다릅니다. 확인해주세요."});
            return;
        }
        this.setState({passwordMsg : ""});
        return;
    }
    async submit(e) {
        e.preventDefault();
        const oldP = this.form.oldPassword.current.value;
        const newP = this.form.newPassword.current.value;
        let msg = await request.ChangePassword(oldP, newP);

        if(typeof(msg) !== "string")
        {
            alert("비밀번호가 변경되었습니다.")
            this.props.history.push("/");
        }
        else
            alert(msg);
    }
    render() {
        return (
            <Container>
            <Form>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>현재 비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={this.form.oldPassword} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>새 비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={this.form.newPassword} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>새 비밀번호 확인</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.checkConfirmPassword.bind(this)}/>
                    <Form.Text className="text-muted">
                        {this.state.passwordMsg}
                    </Form.Text>
                </Form.Group>
                {this.ErrorText(this.state.ErrorText)}
                <Button variant="primary" onClick={this.submit.bind(this)}>
                    비밀번호 변경
                    </Button>
            </Form>
            </Container>
        );
    }
}
export default ChangePassword;
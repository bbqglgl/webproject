import React, { Component } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

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
                    <Form.Control type="password" placeholder="Password" onChange={this.checkConfirmPassword}/>
                    <Form.Text className="text-muted">
                        {this.state.passwordMsg}
                    </Form.Text>
                </Form.Group>
                {this.ErrorText(this.state.ErrorText)}
                <Button variant="primary" type="submit">
                    비밀번호 변경
                    </Button>
            </Form>
            </Container>
        );
    }
}
export default ChangePassword;
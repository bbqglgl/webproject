//내가쓴글
//비밀번호 변경
//로그아웃

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container,ListGroup } from 'react-bootstrap';
import * as request from '../../lib/request';

class MyList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            searchText: "",
            currentPage: 1,
            totalPages: 0
        };
    }
    async componentDidMount() {
        const result = await this.getData("", 1);
        this.setState({ list: result.list, totalPages: result.totalPages });
    }
    async Search(text) {
        const result = await this.getData(text, 1);
        this.setState({ list: result.list, searchText: text, currentPage: 1, totalPages: result.totalPages });
    }
    async chagnePage(page) {
        const result = await this.getData(this.state.searchText, page);
        this.setState({ list: result.list, currentPage: page, totalPages: result.totalPages });
    }
    async getData(text, page) {
        return await request.getMyList(page);
    }

    render() {
        return (
            <Container>
                <ListGroup>
                    <Link to="/My/List">
                    <ListGroup.Item action>
                        내가 쓴 팁
                    </ListGroup.Item>
                    </Link>
                    <Link to="/My/ChangePassword">
                    <ListGroup.Item action>
                        비밀번호 변경
                    </ListGroup.Item>
                    </Link>
                    <ListGroup.Item action>
                        로그아웃
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        );
    }
}

export default withRouter(MyList);
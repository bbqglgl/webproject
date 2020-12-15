import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Container,InputGroup,FormControl, Button } from 'react-bootstrap';
import List from '../components/Board/List';
import ListFooter from '../components/Board/ListFooter';
import * as request from '../lib/request';

class Board extends Component {
    constructor(props) {
        super(props);
        this.form = {
            searchText : createRef(),
        }
        this.state = {
            list: [],
            searchText:"",
            currentPage: 1,
            totalPages: 0
        };
    }
    async componentDidMount() {
        const result = await this.getData("",1);
        console.log(result);
        this.setState({ list: result.list, totalPages: result.totalPages });
    }
    async Search()
    {
        let text = this.form.searchText.current.value;
        const result = await this.getData(text,1);
        this.setState({list : result.list, searchText : text, currentPage: 1, totalPages: result.totalPages});
    }
    async chagnePage(page)
    {
        const result = await this.getData(this.state.searchText,page);
        this.setState({list : result.list, currentPage: page, totalPages: result.totalPages});
    }
    async getData(text, page)
    {
        return (await request.getBoardByTitle(text, page)).data;
    }

    render() {
        return (
            <Container>
                <InputGroup className="mb-3">
                    <FormControl placeholder="검색할 제목을 입력하세요." ref={this.form.searchText} />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={this.Search.bind(this)}>검색</Button>
                    </InputGroup.Append>
                </InputGroup>
                <List data={this.state.list} />
                <ListFooter totalPages={this.state.totalPages} currentPage={this.state.currentPage} changePage={this.chagnePage.bind(this)} />
            </Container>
        );
    }
}

export default withRouter(Board);
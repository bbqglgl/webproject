import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Pagination } from 'react-bootstrap';

class ListFooter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPages: this.props.totalPages,
            currentPage: this.props.currentPage
        }
    }

    getPagination(page)
    {
        let start = page - 2;
        let end = page + 2;
        let items = [];
        if(start < 1)
        {
            end += (1-start);
            start = 1;
        }
        else if(end >= this.props.totalPages)
        {
            start += (this.props.totalPages - end);
            end = this.props.totalPages;
            if(start < 1)
                start = 1;
        }
        if(start > 1)
        {
            items.push(
                <Pagination.First onClick={() => this.props.changePage(1)} />,
            );
        }
        if(end > this.props.totalPages)
            end = this.props.totalPages;

        for (let number = start; number <= end; number++) {
            items.push(
                <Pagination.Item key={number} active={number === page} onClick={() => this.props.changePage(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        if (end < this.props.totalPages)
        {
            items.push(
                <Pagination.Last onClick={() => this.props.changePage(this.props.totalPages)} />,
            );
        }
        return items;
    }

    render() {
        return (
            <>
                <Container>
                    <Pagination>
                        {this.getPagination(this.props.currentPage)}
                    <Link to="/Board/Create">
                        <Button variant="primary">
                            글 쓰기
                        </Button>
                    </Link>
                    </Pagination>
                </Container>
            </>
        );
    }
}

export default ListFooter;
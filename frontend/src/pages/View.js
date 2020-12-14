import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ViewCard from '../components/Board/ViewCard';
import * as request from '../lib/request';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : null
        };
    }
    async componentDidMount() {
        const result = await request.getView(this.props.match.params.id);
        this.setState({data:result.data});
    }

    render() {
        return (
            <Container>
                <ViewCard data={this.state.data} />
            </Container>
        );
    }
}

export default withRouter(Board);
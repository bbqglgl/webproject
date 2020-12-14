import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class ViewCard extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
    }

    render() {
        return (
            <>
                <Container>
                    ViewCard
                </Container>
            </>
        );
    }
}

export default ViewCard;
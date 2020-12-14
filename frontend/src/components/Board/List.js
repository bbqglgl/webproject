import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Badge, Card } from 'react-bootstrap';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tips: []
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
         tips:nextProps.data
        };
       }
    componentDidMount() {
        this.setState({ tips: this.props.data });
    }
    renderList(element, i) {
        return (
            <Link key={i} to={"/View/" + element._id}>
                <Card>
                    <Card.Body>{element.title}<Badge variant="dark">{element.good}👍</Badge></Card.Body>
                </Card>
            </Link>
        );
    }

    render() {
        return (
            <>
                <Container>
                    {this.state.tips.map((l,i) => this.renderList(l, i))}
                </Container>
            </>
        );
    }
}

export default List;
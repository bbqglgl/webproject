import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../actions/todo';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    changeHandler = (e) => {
        this.setState({ text: e.target.value });
    }
    Create = () => {
        this.props.createTodo(this.state.text);
        this.setState({ text: '' });
    }
    render = () =>
        <>
            <input type="text" value={this.state.text} onChange={this.changeHandler} />
            <button onClick={this.Create}>Add</button>
        </>
}

const mapStateToProps = state => { return state; };

const mapDispatchToProps = dispatch => ({
    createTodo: text => dispatch(createTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
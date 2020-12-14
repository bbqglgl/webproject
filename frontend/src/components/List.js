import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodo } from '../actions/todo';

class List extends Component {

    ListRender = () => {
        const list = this.props.todo;
        return (list.map(todo => (
            <li class={ todo.completed ? "completed" : "" }>
                <span>{todo.text}</span>
                <p>
                    <button onClick={() => this.props.toggleTodo(todo.id)}>완료</button>
                    <button onClick={() => this.props.deleteTodo(todo.id)}>삭제</button>
                </p>
            </li>
        )))
    }
    render = () =>
        <>
            <ul>
                {this.ListRender()}
            </ul>
        </>
}
const mapStateToProps = state => { return state; };

const mapDispatchToProps = dispatch => ({
    deleteTodo: text => dispatch(deleteTodo(text)),
    toggleTodo: id => dispatch(toggleTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
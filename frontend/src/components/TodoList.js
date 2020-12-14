import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import List from './List';

class TodoList extends Component{

    render = () =>
    <>
        <span>total : {this.props.todo.length} / Done : {this.props.todo.filter(todo => todo.completed === true).length}</span>
        <Form />
        <List />
    </>
  }

  const mapStateToProps = state => { return state; };
  
  export default connect(mapStateToProps)(TodoList);
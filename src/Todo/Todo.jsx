import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../App.css';

class Todo extends Component{ 
  
  constructor(props){
    super(props);
    this.todoContent = props.todoContent;
    this.todoId = props.todoId;
    this.completeTodo = props.completeTodo;

  }

  render(){
    
    return(
      <div className="todo fade-in">
        <p className="todoContent">{this.todoContent}</p>
      </div>
    );
  }
}

Todo.propTypes = {
  noteContent: PropTypes.string
}

export default Todo;
import React, { Component } from 'react';


class TodoForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      newTodoContent: '',
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeTodo = this.writeTodo.bind(this);
  }

handleUserInput(e){
  this.setState({
    newTodoContent: e.target.value,
  })
}

writeTodo(e){
  e.preventDefault();
    this.props.addTodo(this.state.newTodoContent);

    this.setState({
        newTodoContent: '',
    })

}
  render() {
    return(
        <form>
            <input className="todo-input"
            placeholder="Add a todo"
            value={this.state.newTodoContent}
            onChange={this.handleUserInput} />
            <button className="todo-button" onClick={this.writeTodo}>Add todo</button>
        </form>
    )
  }

}

export default TodoForm;
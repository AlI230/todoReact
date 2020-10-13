import React, { Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { RiCloseCircleLine } from 'react-icons/ri';
import { MdDone } from 'react-icons/md';

import Todo from './Todo/Todo';
import TodoForm from './TodoForm/TodoForm'
import './App.css';
import {DB_CONFIG} from './config/config';

class App extends Component {

  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this); 

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('todos');

    this.state = {
      todos: [],
      edit: false,
      setEdit: {
        id: null,
        todoContent: ''
      }
    }
  }

  componentDidMount() {
    const previousTodos = this.state.todos;

    this.database.on('child_added', snap => {
      previousTodos.push({
        id: snap.key,
        todoContent: snap.val().todoContent,
        isComplete: snap.val().isComplete
      })
      this.setState({
        todos: previousTodos
      })
    } )

    this.database.on('child_changed', snap => {
      this.state.todos.forEach(todo => {
        if(snap.key === todo.id) {
          todo.id = snap.key;
          todo.todoContent = snap.val().todoContent;
          todo.isComplete = snap.val().isComplete;
        }
      });
      this.setState({
          notes: this.state.notes,
        });
    });


    this.database.on('child_removed', snap => {
      for(var i=0; i < previousTodos.length; i++) {
        if(previousTodos[i].id === snap.key){
          previousTodos.splice(i, 1);
        }
        this.setState({
        todos: previousTodos
      })

      }
    })
  }

  addTodo(todo) {
    this.database.push().set({todoContent: todo, isComplete: false})
  }

  removeTodo(todoId) {
    this.database.child(todoId).remove();
  }

  completeTodo(todoId, isComplete) {
    this.database.child(todoId).update({isComplete: !isComplete});
  }


  render() {
    return (
      <div className="todo-app">
        <h1>What's the plan for today?</h1>
        <div className="todo-form">
          <TodoForm addTodo={this.addTodo} />
        </div>
        
          {
            this.state.todos.map((todo)=> {
              return (
                <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={todo.id} >
                  <Todo todoContent={todo.todoContent} todoId={todo.id} />
                  <div className="icons" key={todo.todoContent} >
                    <MdDone onClick={()=> this.completeTodo(todo.id, todo.isComplete)}/>
                    <RiCloseCircleLine onClick={()=> this.removeTodo(todo.id)} className="delete-icon" />
                  </div>
                </div>

              )
            })
          }
      </div>
    );
  }
}

export default App;

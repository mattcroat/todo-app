import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "To-Do App",
      newTodo: "",
      todos: [
        {
          title: "Learn React",
          done: false
        },
        {
          title: "Learn JSX",
          done: false
        }
      ]
    };
  }

  newTodoChanged(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  formSubmitted(event) {
    event.preventDefault();

    this.setState({
      newTodo: "",
      todos: [
        ...this.state.todos,
        {
          title: this.state.newTodo,
          done: false
        }
      ]
    });
  }

  toggleTodoDone(event, index) {
    console.log(event.target.checked);
    // copy the array
    const todos = [...this.state.todos];
    // copy the todo (can also use Object.assign)
    todos[index] = { ...todos[index] };
    // update done property on copied todo
    todos[index].done = event.target.checked;
    this.setState({
      todos
    });
  }

  removeTodo(index) {
    // copy the array
    const todos = [...this.state.todos];
    // remove todo
    todos.splice(index, 1);

    this.setState({
      todos
    });
  }

  AllDone() {
    const todos = this.state.todos.map(todo => {
      return {
        // can also use ...todo
        title: todo.title,
        done: true
      };
    });

    this.setState({
      todos
    });
  }

  render() {
    return (
      <div className="App">
        <h3>{this.state.message}</h3>
        <NewTodoForm
          newTodo={this.state.newTodo}
          formSubmitted={this.formSubmitted.bind(this)}
          newTodoChanged={this.newTodoChanged.bind(this)}
        />
        <button onClick={() => this.AllDone()}>All Done</button>
        <TodoList
          todos={this.state.todos}
          toggleTodoDone={this.toggleTodoDone.bind(this)}
          removeTodo={this.removeTodo.bind(this)}
        />
      </div>
    );
  }
}

export default App;

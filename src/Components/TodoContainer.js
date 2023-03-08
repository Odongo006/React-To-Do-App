// Importing React and uuidv4 library for unique id generation
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

// Importing other components
import TodoList from './TodoList';
import Header from './Header';
import InputTodo from './InputTodo';

// Define a TodoApp class component that extends React.Component
class TodoApp extends React.Component {
  // Constructor to initialize state with an empty array for todos
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  // A lifecycle method that is called after the component is mounted.
  // It retrieves todos from local storage and updates state if any are present.
  componentDidMount() {
    const loadedTodos = JSON.parse(localStorage.getItem('todos'));
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos,
      });
    }
  }

  // A lifecycle method that is called after the component is updated.
  // It stores todos in local storage if there are any changes made to the state.
  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  // A function that toggles the completed status of a todo item.
  handleChange = (todoId) => {
    this.setState((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    }));
  }

  // A function that deletes a todo item from the list.
  deleteItem = (todoId) => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    }));
  }

  // A function that adds a new todo item to the list.
  addItem = (title) => {
    this.setState((state) => ({
      todos: [...state.todos, { id: uuidv4(), title, completed: false }],
    }));
  }

  // A function that edits the title of a todo item.
  handleEdit = (newTitle, id) => {
    this.setState((state) => ({
      todos: [...state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }
        return todo;
      })],
    }));
  }

  // Render method to display the TodoApp component.
  render() {
    const { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="inner">
          <Header />
          <InputTodo addItem={this.addItem} />
          <ul>
            <TodoList
              todos={todos}
              handleChange={this.handleChange}
              deleteItem={this.deleteItem}
              handleEdit={this.handleEdit}
            />
          </ul>
        </div>
      </div>
    );
  }
}

// Export the TodoApp component as default
export default TodoApp;

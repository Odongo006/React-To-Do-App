// Import React and PropTypes libraries
import React from 'react';
import PropTypes from 'prop-types';

// Import TodoItem component
import TodoItem from './TodoItem';

// Define TodoList component as a class that extends from React.Component
class TodoList extends React.Component {
  // Define a constructor with props parameter
  constructor(props) {
    // Call the super method with props parameter
    super(props);
    // Initialize the state object
    this.state = {};
  }

  // Define the render method that returns a list of TodoItems
  render() {
    // Destructure props object to get todos, handleChange, deleteItem, and handleEdit properties
    const {
      todos, handleChange, deleteItem, handleEdit,
    } = this.props;

    // Return an unordered list of TodoItems with their properties passed as props
    return (
      <ul>
        {todos.map((todo) => (
          <TodoItem
            id={todo.id}
            key={todo.id}
            completed={todo.completed}
            title={todo.title}
            handleChange={handleChange}
            deleteItem={deleteItem}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    );
  }
}

// Define propTypes to ensure that the correct types of props are passed
TodoList.propTypes = {
  handleChange: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  todos: PropTypes.instanceOf(Array).isRequired,
  handleEdit: PropTypes.func.isRequired,
};

// Export TodoList component
export default TodoList;

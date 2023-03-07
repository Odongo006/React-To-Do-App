// Importing React and PropTypes
import React from 'react';
import PropTypes from 'prop-types';

// Importing the CSS style for the todo item
import styles from '../style/todoItem.css';

// Defining a class component TodoItem
class TodoItem extends React.Component {
  constructor(props) {
    // Invoking the parent constructor
    super(props);
    // Setting the initial state of the component
    this.state = {
      editing: false,
    };
  }

  // A method to set the editing state to true on double click
  editItem = () => {
    this.setState({ editing: true });
  }

  // A method to set the editing state to false when the user is done editing the item
  handleEditDone = (event) => {
    if (event.key === 'Enter') {
      this.setState({ editing: false });
    }
  }

  // The render method of the component
  render() {
    // Extracting the necessary props and state from the component
    const {
      id, title, completed, handleChange, deleteItem, handleEdit,
    } = this.props;

    const { editing } = this.state;

    // Setting styles for view and edit mode
    const viewMode = {};
    const editMode = {};

    if (editing) {
      viewMode.display = 'none';
    } else {
      editMode.display = 'none';
    }

    // Setting styles for completed todo items
    const completedStyle = {
      fontStyle: 'italic',
      color: '#595959',
      opacity: 0.4,
      textDecoration: 'line-through',
    };

    // Rendering the todo item
    return (
      <li className={styles.item}>
        <div onDoubleClick={this.editItem} style={viewMode}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={() => handleChange(id)}
          />
          <span style={completed ? completedStyle : null}>
            {title}
          </span>
          <button type="button" onClick={() => deleteItem(id)}>Delete</button>
        </div>
        <input
          type="text"
          style={editMode}
          className={styles.textInput}
          value={title}
          onChange={(e) => handleEdit(e.target.value, id)}
          onKeyDown={this.handleEditDone}
        />
      </li>
    );
  }
}

// Setting PropTypes for the component
TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  deleteItem: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

// Exporting the component
export default TodoItem;

// Importing required dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Creating a class component called InputTodo
class InputTodo extends React.Component {
  // Setting the state with an initial value of an empty string
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  // Function to handle input change and update the state
  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // Function to handle form submission
  handleSubmit = (event) => {
    // Preventing the default form submission behavior
    event.preventDefault();
    // Destructuring the state
    const { title } = this.state;
    // Destructuring the props to get the addItem function
    const { addItem } = this.props;
    // If the title is not an empty string after trimming, then addItem is called and
    // title state is reset
    if (title.trim()) {
      addItem(title);
      this.setState({ title: '' });
    }
  }

  // Rendering the component with input form and submit button
  render() {
    // Destructuring the title state
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <input
          type="text"
          className="input-text"
          name="title"
          placeholder="Add to do..."
          value={title}
          onChange={this.handleInput}
        />
        <input type="submit" className="input-submit" onClick={() => this.handleSubmit} />
      </form>
    );
  }
}

// Adding propTypes validation for the required props of addItem function
InputTodo.propTypes = {
  addItem: PropTypes.func.isRequired,
};

// Exporting the InputTodo component as a default
export default InputTodo;

import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      name: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.enableButton);
  }

  enableButton = () => {
    const { name, email } = this.state;
    const isNameValid = name.length > 0;
    const isEmailValid = email.length > 0;
    this.setState({ isButtonDisabled: !(isNameValid && isEmailValid) });
  }

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            data-testid="input-player-name"
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ isButtonDisabled }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = ({

});

export default Login;

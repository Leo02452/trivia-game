import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addNewPlayer from '../redux/actions';

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

  handleClick = () => {
    const { dispatchUser } = this.props;
    const { name, email } = this.state;
    dispatchUser(name, email);
  }

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <>
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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <Link to="/configuracoes">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (name, email) => dispatch(addNewPlayer(name, email)),
});

Login.propTypes = ({
  dispatchUser: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps)(Login);

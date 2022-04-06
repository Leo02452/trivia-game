import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gravatarAPI from '../services/gravatarAPI';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const urlImage = gravatarAPI(email);
    this.setState({ url: urlImage });
  }

  render() {
    const { name, score } = this.props;
    const { url } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ url }
          alt="Foto de Perfil"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = ({
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
});

export default connect(mapStateToProps)(Header);

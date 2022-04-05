import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gravatarAPI from '../services/gravatarAPI';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatarAPI() }
          alt="Foto de Perfil"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = ({
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
});

export default connect(mapStateToProps)(Header);

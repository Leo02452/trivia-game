import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, urlImage } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ urlImage || '' }
          alt="Foto de Perfil"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  urlImage: state.player.urlAvatar,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = ({
  urlImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
});

export default connect(mapStateToProps)(Header);

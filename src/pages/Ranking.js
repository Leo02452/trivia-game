import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem('users'));
    users.sort((a, b) => b.score - a.score);
    this.setState({ users });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { users.map((user, index) => (
          <div key={ index }>
            <span
              data-testid={ `player-name${index}` }
            >
              { user.name }
            </span>
            <span
              data-testid={ `player-score${index}` }
            >
              { user.score }
            </span>
            <img src={ user.picture } alt={ `Foto de ${user.score}` } />
          </div>
        )) }
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Home
          </button>
        </Link>
      </div>

    );
  }
}

export default Ranking;

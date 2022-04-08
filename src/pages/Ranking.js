import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        {/* Req 16 */}
        <h1 data-testid="ranking-title">Ranking</h1>
        {/* Req 17 */}
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

import { ADD_NEW_PLAYER, SET_SCORE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  const { name, email, type, score } = action;
  switch (type) {
  case ADD_NEW_PLAYER:
    return {
      ...state,
      name,
      gravatarEmail: email,
    };
  case SET_SCORE:
    return {
      ...state,
      score,
    };
  default:
    return state;
  }
}

export default player;

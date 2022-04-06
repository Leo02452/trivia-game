import { ADD_NEW_PLAYER } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  const { name, email, type } = action;
  switch (type) {
  case ADD_NEW_PLAYER:
    return {
      ...state,
      name,
      gravatarEmail: email,
    };
  default:
    return state;
  }
}

export default player;

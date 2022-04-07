import { GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {};

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      payload: action.payload,
    };
  default:
    return state;
  }
}

export default trivia;

const GET_TOKEN = 'GET_TOKEN';
const REQUEST_TOKEN = 'REQUEST_TOKEN';
const FAILED_REQUEST = 'FAILED_REQUEST';
const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const GET_QUESTIONS = 'GET_QUESTIONS';

function getToken(json) {
  return { type: GET_TOKEN, payload: json.token };
}

function requestToken() {
  return { type: REQUEST_TOKEN };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

function requestQuestions() {
  return { type: REQUEST_QUESTIONS };
}

function getQuestions(json) {
  return { type: GET_QUESTIONS, payload: json };
}

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const json = await response.json();
      return dispatch(getToken(json));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}

export function fetchQuestions(token) {
  return async (dispatch) => {
    dispatch(requestQuestions());
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const json = await response.json();
      return dispatch(getQuestions(json));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}

// https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// // Recomendação
// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}

const addNewPlayer = (name, email) => ({
  type: ADD_NEW_PLAYER,
  name,
  email,
});

export {
  GET_TOKEN,
  REQUEST_TOKEN,
  FAILED_REQUEST,
  addNewPlayer,
  ADD_NEW_PLAYER,
  GET_QUESTIONS,
  REQUEST_QUESTIONS,
};

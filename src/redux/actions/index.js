import md5 from 'crypto-js/md5';

const GET_TOKEN = 'GET_TOKEN';
const REQUEST_TOKEN = 'REQUEST_TOKEN';
const FAILED_REQUEST = 'FAILED_REQUEST';

function getToken(json) {
  return { type: GET_TOKEN, payload: json.token };
}

function requestToken() {
  return { type: REQUEST_TOKEN };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
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

const addNewPlayer = (name, email) => ({
  type: 'ADD_NEW_PLAYER',
  name,
  email,
});

const addAvatar = (avatar) => ({
  type: 'ADD_AVATAR',
  avatar,
});

export function fetchAvatar(email) {
  return async (dispatch) => {
    const hashCreated = md5(email).toString();
    // console.log(hashCreated);
    const response = await fetch(`https://www.gravatar.com/avatar/${hashCreated}/`);
    return dispatch(addAvatar(response.url));
  };
}

export {
  GET_TOKEN,
  REQUEST_TOKEN,
  FAILED_REQUEST,
  addNewPlayer,
};

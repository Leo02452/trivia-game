const INITIAL_STATE = {
  urlAvatar: '',
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  const { name, email, type, avatar } = action;
  switch (type) {
  case 'ADD_NEW_PLAYER':
    return {
      ...state,
      name,
      gravatarEmail: email,
    };
  case 'ADD_AVATAR':
    return {
      ...state,
      urlAvatar: avatar,
    };
  default:
    return state;
  }
}

export default player;

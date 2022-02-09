import * as types from './types';

const initialState = {
  games: null,
  currentGame: null,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case types.GET_GAME_LIST:
      return {
        ...state,
        games: payload,
      };
    case types.LISTEN_CURRENT_GAME:
      return {
        ...state,
        currentGame: payload,
      };
    default:
      return state;
  }
}

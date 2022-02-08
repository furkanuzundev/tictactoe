import * as types from './types';

const initialState = {
  games: null,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case types.GET_GAME_LIST:
      return {
        ...state,
        games: payload,
      };
    default:
      return state;
  }
}

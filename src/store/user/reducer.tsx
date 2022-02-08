import * as types from './types';

const initialState = {
  currentUser: null,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case types.SET_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
}

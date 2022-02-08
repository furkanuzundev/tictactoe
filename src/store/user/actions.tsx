import * as types from './types';

export const setUser = (currentUser: any) => ({
  type: types.SET_USER,
  payload: currentUser,
});

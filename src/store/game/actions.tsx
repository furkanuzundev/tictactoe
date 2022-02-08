import * as types from './types';

export const getGameList = (games: any) => ({
  type: types.GET_GAME_LIST,
  payload: games,
});

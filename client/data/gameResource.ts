import { CACHE } from '../utils/constants';
import { getOne, APIReciever, APIGiver, updateOne, getMany } from './crud';

export const getGame: APIReciever<GameResource> = () =>
  getOne(CACHE.GAME, '/api/game/create');

export const getGameById: APIReciever<GameResource> = (id) =>
  getOne(CACHE.GAME, `/api/game/${id}`);

export const updateGame: APIGiver<GameSubmission, GameResource> = (
  id,
  callback?: (res: ServerReponse<GameResource>) => void
) => updateOne(CACHE.GAME, `/api/game/${id}`, callback);

export const getAllGames: APIReciever<GameResource[]> = () =>
  getMany(CACHE.GAMES, '/api/game');

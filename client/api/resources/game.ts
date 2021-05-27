import { CACHE } from '../../utils/constants';
import {
  APIGiver,
  APIReciever,
  createOne,
  getMany,
  getOne,
  updateOne,
} from '../crud';

export const getGames: APIReciever<GameResource[]> = () =>
  getMany(CACHE.GAME, '/api/game');

export const createGame: APIGiver<GameSubmission, GameResource> = () =>
  createOne(CACHE.GAME, '/api/game');

export const getGame: APIReciever<GameResource> = (id) =>
  getOne(CACHE.GAME + id, `/api/game/${id}`);

export const updateGame: APIGiver<GameSubmission, GameResource> = (
  id,
  callback
) => updateOne(CACHE.GAME, `/api/game/${id}`, callback);

import { CACHE } from '../../utils/constants';
import { APIGiver, APIReciever, createOne, getMany } from '../crud';

export const getGames: APIReciever<GameResource[]> = () =>
  getMany(CACHE.GAME, '/api/game');

export const createGame: APIGiver<GameSubmission, GameResource> = () =>
  createOne(CACHE.GAME, '/api/game');

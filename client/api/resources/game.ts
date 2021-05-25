import { CACHE } from '../../utils/constants';
import { APIReciever, getMany } from '../crud';

export const getGames: APIReciever<GameResource[]> = () =>
  getMany(CACHE.GAME, '/api/game');

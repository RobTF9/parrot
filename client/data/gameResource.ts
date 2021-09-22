import { CACHE } from '../utils/constants';
import { getOne, APIReciever } from './crud';

export const getGame: APIReciever<GameResource> = () =>
  getOne(CACHE.GAME, '/api/game/create');

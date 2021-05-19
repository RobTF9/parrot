import { CACHE } from '../../utils/constants';
import { APIReciever, getMany } from '../crud';

export const getWords: APIReciever<WordResource[]> = () =>
  getMany(CACHE.WORD, '/api/word');

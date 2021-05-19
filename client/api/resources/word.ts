import { CACHE } from '../../utils/constants';
import { APIReciever, getMany, getOne } from '../crud';

export const getWords: APIReciever<WordResource[]> = () =>
  getMany(CACHE.WORD, '/api/word');

export const getWord: APIReciever<WordResource> = (id) =>
  getOne(CACHE.WORD + id, `/api/word/${id}`);

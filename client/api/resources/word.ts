import { CACHE } from '../../utils/constants';
import { APIGiver, APIReciever, getMany, getOne, updateOne } from '../crud';

export const getWords: APIReciever<WordResource[]> = () =>
  getMany(CACHE.WORD, '/api/word');

export const getWord: APIReciever<WordResource> = (id) =>
  getOne(CACHE.WORD + id, `/api/word/${id}`);

export const updateWord: APIGiver<WordSubmission, WordResource> = (
  id,
  callback
) => updateOne(CACHE.WORD, `/api/word/${id}`, callback);

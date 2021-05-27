import { CACHE } from '../../utils/constants';
import {
  APIGiver,
  APIReciever,
  createOne,
  getMany,
  getOne,
  updateOne,
} from '../crud';

export const getWords: APIReciever<ItemResource[]> = () =>
  getMany(CACHE.WORD, '/api/word');

export const getWord: APIReciever<ItemResource> = (id) =>
  getOne(CACHE.WORD + id, `/api/word/${id}`);

export const updateWord: APIGiver<ItemSubmission, ItemResource> = (
  id,
  callback
) => updateOne(CACHE.WORD, `/api/word/${id}`, callback);

export const createWord: APIGiver<ItemSubmission, ItemResource> = (
  _,
  callback
) => createOne(CACHE.WORD, `/api/word/`, callback);

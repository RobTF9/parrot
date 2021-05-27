import { CACHE } from '../../utils/constants';
import {
  APIGiver,
  APIReciever,
  createOne,
  getMany,
  getOne,
  updateOne,
} from '../crud';

export const getSentences: APIReciever<ItemResource[]> = () =>
  getMany(CACHE.SENTENCE, '/api/sentence');

export const getSentence: APIReciever<ItemResource> = (id) =>
  getOne(CACHE.SENTENCE + id, `/api/sentence/${id}`);

export const updateSentence: APIGiver<ItemSubmission, ItemResource> = (
  id,
  callback
) => updateOne(CACHE.SENTENCE, `/api/sentence/${id}`, callback);

export const createSentence: APIGiver<ItemSubmission, ItemResource> = (
  _,
  callback
) => createOne(CACHE.SENTENCE, `/api/sentence`, callback);

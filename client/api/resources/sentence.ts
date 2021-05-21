import { CACHE } from '../../utils/constants';
import {
  APIGiver,
  APIReciever,
  createOne,
  getMany,
  getOne,
  updateOne,
} from '../crud';

export const getSentences: APIReciever<SentenceResource[]> = () =>
  getMany(CACHE.SENTENCE, '/api/sentence');

export const getSentence: APIReciever<SentenceResource> = (id) =>
  getOne(CACHE.SENTENCE + id, `/api/sentence/${id}`);

export const updateSentence: APIGiver<SentenceSubmission, SentenceResource> = (
  id,
  callback
) => updateOne(CACHE.SENTENCE, `/api/sentence/${id}`, callback);

export const createSentence: APIGiver<SentenceSubmission, SentenceResource> = (
  _,
  callback
) => createOne(CACHE.SENTENCE, `/api/sentence/`, callback);

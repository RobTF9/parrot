import { CACHE } from '../utils/constants';
import {
  createOne,
  APIGiver,
  APIReciever,
  getMany,
  getOne,
  updateOne,
} from './crud';

export const createPhrase: APIGiver<PhraseSubmission, PhraseResource> = (
  _,
  callback?: (res: ServerReponse<PhraseResource>) => void
) =>
  createOne<PhraseSubmission, PhraseResource>(
    CACHE.PHRASE,
    '/api/phrase',
    callback
  );

export const getPhrases: APIReciever<PhraseResource[]> = () =>
  getMany<PhraseResource>(CACHE.PHRASE, '/api/phrase');

export const getPhrase: APIReciever<PhraseResource> = (id) =>
  getOne<PhraseResource>(CACHE.PHRASE + id, `/api/phrase/${id}`);

export const updatePhrase: APIGiver<PhraseSubmission, PhraseResource> = (
  id,
  callback?: (res: ServerReponse<PhraseResource>) => void
) =>
  updateOne<PhraseSubmission, PhraseResource>(
    CACHE.PHRASE + id,
    `/api/phrase/${id}`,
    callback
  );

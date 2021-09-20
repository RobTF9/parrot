import { CACHE } from '../utils/constants';
import { createOne, APIGiver, APIReciever, getMany } from './crud';

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

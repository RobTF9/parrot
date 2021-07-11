import { CACHE } from '../utils/constants';
import { getMany, APIReciever, createOne, APIGiver } from './crud';

export const getLexicons: APIReciever<LexiconResource[]> = () =>
  getMany<LexiconResource>(CACHE.LEXICON, '/api/lexicon');

export const createLexicon: APIGiver<LexiconSubmission, LexiconResource> = (
  _,
  callback?: (res: ServerReponse<LexiconResource>) => void
) =>
  createOne<LexiconSubmission, LexiconResource>(
    CACHE.LEXICON,
    '/api/lexicon',
    callback
  );

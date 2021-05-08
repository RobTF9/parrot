import { CACHE } from '../../utils/constants';
import { getMany, createOne, APIReciever, APIGiver, updateOne } from '../crud';

export const getLexicons: APIReciever<LexiconResource[]> = () =>
  getMany<LexiconResource>(CACHE.LEXICON, '/api/lexicon');

export const getShared: APIReciever<LexiconResource[]> = () =>
  getMany<LexiconResource>(CACHE.SHARED_LEXICON, '/api/lexicon/shared');

export const createLexicon: APIGiver<LexiconSubmission, LexiconResource> = (
  _,
  callback?: (res: ServerReponse<LexiconResource>) => void
) =>
  createOne<LexiconSubmission, LexiconResource>(
    CACHE.LEXICON,
    '/api/lexicon',
    callback
  );

export const shareLexicon: APIGiver<Email, LexiconResource> = (
  id?: string,
  callback?: (res: ServerReponse<LexiconResource>) => void
) => updateOne(CACHE.LEXICON, `/api/lexicon/${id}`, callback);

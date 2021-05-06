import { CACHE } from '../../utils/constants';
import { getMany, createOne, APIReciever, APIGiver, updateOne } from '../crud';

export const getLexicons: APIReciever<LexiconResource[]> = () =>
  getMany<LexiconResource>(CACHE.LEXICON, '/api/lexicon');

export const getShared: APIReciever<LexiconResource[]> = () =>
  getMany<LexiconResource>(CACHE.SHARED_LEXICON, '/api/lexicon/shared');

export const createLexicon: APIGiver<LexiconSubmission, LexiconResource> = () =>
  createOne<LexiconSubmission, LexiconResource>(CACHE.LEXICON, '/api/lexicon');

export const shareLexicon: APIGiver<{ email: string }, LexiconResource> = (
  id?: string
) => updateOne(CACHE.LEXICON, `/api/lexicon/${id}`);

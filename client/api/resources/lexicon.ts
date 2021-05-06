import { CACHE } from '../../utils/constants';
import { getMany, createOne, APIReciever, APIGiver } from '../crud';

export const getLexicons: APIReciever<LexiconResource[]> = () =>
  getMany<LexiconResource>(CACHE.LEXICON, '/api/lexicon');

export const createLexicon: APIGiver<LexiconSubmission, LexiconResource> = () =>
  createOne<LexiconSubmission, LexiconResource>(CACHE.LEXICON, '/api/lexicon');

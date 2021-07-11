import { CACHE } from '../utils/constants';
import { getMany, APIReciever } from './crud';

export const getLexicons: APIReciever<LexiconResource[]> = () =>
  getMany<LexiconResource>(CACHE.LEXICON, '/api/lexicon');

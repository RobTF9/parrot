import { CACHE } from '../utils/constants';
import { getMany, APIReciever, createOne, APIGiver } from './crud';

export const getParrots: APIReciever<ParrotResource[]> = () =>
  getMany<ParrotResource>(CACHE.LEXICON, '/api/parrot');

export const createParrot: APIGiver<ParrotSubmission, ParrotResource> = (
  _,
  callback?: (res: ServerReponse<ParrotResource>) => void
) =>
  createOne<ParrotSubmission, ParrotResource>(
    CACHE.LEXICON,
    '/api/parrot',
    callback
  );

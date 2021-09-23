import { CACHE } from '../utils/constants';
import {
  getMany,
  APIReciever,
  createOne,
  APIGiver,
  getOne,
  updateOne,
} from './crud';

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

export const updateParrot: APIGiver<ParrotSubmission, ParrotResource> = (
  id,
  callback?: (res: ServerReponse<ParrotResource>) => void
) =>
  updateOne<ParrotSubmission, ParrotResource>(
    CACHE.LEXICON,
    `/api/parrot/${id}`,
    callback
  );

export const getActiveParrot: APIReciever<ParrotResource> = () =>
  getOne<ParrotResource>(CACHE.PARROT_EDIT, '/api/parrot/active');

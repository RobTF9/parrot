import { CACHE } from '../utils/constants';
import { APIReciever, getOne } from './crud';

export const getUser: APIReciever<UserResource> = () =>
  getOne<UserResource>(CACHE.USER, '/api/user');

import { CACHE } from '../utils/constants';
import { APIGiver, APIReciever, getOne, updateOne } from './crud';

export const getUser: APIReciever<UserResource> = () =>
  getOne<UserResource>(CACHE.USER, '/api/user');

export const updateUser: APIGiver<UserSubmission, UserResource> = () =>
  updateOne<UserSubmission, UserResource>(CACHE.USER, '/api/user');

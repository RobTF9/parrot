import { CACHE } from '../../utils/constants';
import { APIGiver, APIReciever, getOne, updateOne } from '../crud';

export const getUser: APIReciever<UserResource> = () =>
  getOne(CACHE.USER, '/api/user');

export const updateUser: APIGiver<UserSubmission, UserResource> = () =>
  updateOne(CACHE.USER, '/api/user');
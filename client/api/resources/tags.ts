import { CACHE } from '../../utils/constants';
import { APIGiver, APIReciever, getMany, createOne } from '../crud';

export const getTags: APIReciever<TagResource[]> = () =>
  getMany(CACHE.TAG, '/api/tag');

export const createTag: APIGiver<TagSubmission, TagResource> = (_, callback) =>
  createOne(CACHE.TAG, '/api/tag', callback);

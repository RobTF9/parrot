import { CACHE } from '../../utils/constants';
import { APIReciever, getMany } from '../crud';

export const getTags: APIReciever<TagResource[]> = () =>
  getMany(CACHE.TAG, '/api/tag');

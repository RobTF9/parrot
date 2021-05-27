import { CACHE } from '../../utils/constants';
import { getMany, APIReciever } from '../crud';

export const getItems: APIReciever<ItemResource[]> = () =>
  getMany(CACHE.ITEM, '/api/item');

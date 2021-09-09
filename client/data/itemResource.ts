import { CACHE } from '../utils/constants';
import { createOne, APIGiver, APIReciever, getMany } from './crud';

export const createItem: APIGiver<ItemSubmission, ItemResource> = (
  _,
  callback?: (res: ServerReponse<ItemResource>) => void
) => createOne<ItemSubmission, ItemResource>(CACHE.ITEM, '/api/item', callback);

export const getItems: APIReciever<ItemResource[]> = () =>
  getMany<ItemResource>(CACHE.ITEM, '/api/item');

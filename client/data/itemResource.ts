import { CACHE } from '../utils/constants';
import { createOne, APIGiver } from './crud';

export const createItem: APIGiver<ItemSubmission, ItemResource> = (
  _,
  callback?: (res: ServerReponse<ItemResource>) => void
) => createOne<ItemSubmission, ItemResource>(CACHE.ITEM, '/api/item', callback);

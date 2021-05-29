import { APIReciever, getOne } from '../crud';
import { CACHE } from '../../utils/constants';

export const getResult: APIReciever<ResultResource> = (id) =>
  getOne(CACHE.RESULT + id, `/api/result/${id}`);

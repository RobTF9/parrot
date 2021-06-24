import { APIGiver, APIReciever, getOne, updateOne } from '../crud';
import { CACHE } from '../../utils/constants';

export const newResult: APIReciever<ResultResource> = (id) =>
  getOne(CACHE.RESULT, `/api/result/new/${id}`);

export const getResult: APIReciever<ResultResource> = (id) =>
  getOne(CACHE.RESULT, `/api/result/${id}`);

export const updateResult: APIGiver<ResultSubmission, ResultResource> = (
  id,
  callback
) => updateOne(CACHE.RESULT, `/api/result/${id}`, callback);

import { APIGiver, APIReciever, createOne, getOne, updateOne } from '../crud';
import { CACHE } from '../../utils/constants';

export const newResult: APIGiver<{ game: string }, ResultResource> = (
  _,
  callback
) => createOne(CACHE.RESULT, `/api/result/new`, callback);

export const getResult: APIReciever<ResultResource> = (id) =>
  getOne(CACHE.RESULT, `/api/result/${id}`);

export const updateResult: APIGiver<ResultSubmission, ResultResource> = (
  id,
  callback
) => updateOne(CACHE.RESULT, `/api/result/${id}`, callback);

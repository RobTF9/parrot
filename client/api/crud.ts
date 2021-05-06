import { useQuery, UseMutateFunction, useMutation } from 'react-query';
import { get, post, put } from './fetch';
import { queryClient } from '../context/Query';

export interface APIReciever<T> {
  (): [data: { data: T } | undefined, isLoading: boolean];
}

export function getMany<T>(
  cache: string,
  endpoint: string
): [data: { data: Array<T> } | undefined, isLoading: boolean] {
  const { data, isLoading } = useQuery(cache, () =>
    get<{ data: Array<T> }>(endpoint)
  );
  return [data, isLoading];
}

export function getOne<T>(
  cache: string,
  endpoint: string
): [data: { data: T } | undefined, isLoading: boolean] {
  const { data, isLoading } = useQuery(cache, () => get<{ data: T }>(endpoint));
  return [data, isLoading];
}

export interface APIGiver<T, U> {
  (id?: string, callback?: (res: ServerReponse<U>) => void): [
    mutate: UseMutateFunction<{ data: U }, unknown, T, unknown>,
    isLoading: boolean
  ];
}

export function createOne<T, U>(
  cache: string,
  endpoint: string
): [
  mutate: UseMutateFunction<{ data: U; message: string }, unknown, T, unknown>,
  isLoading: boolean
] {
  const { mutate, isLoading } = useMutation(
    (u: T) => post<T, { message: string; data: U }>(endpoint, u),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(cache);
      },
    }
  );
  return [mutate, isLoading];
}

export function updateOne<T, U>(
  cache: string,
  endpoint: string,
  callback?: (res: ServerReponse<U>) => void
): [
  mutate: UseMutateFunction<{ data: U; message: string }, unknown, T, unknown>,
  isLoading: boolean
] {
  const { mutate, isLoading } = useMutation(
    (u: T) =>
      put<T, { message: string; data: U }>(endpoint, {
        ...u,
        updatedAt: undefined,
      }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(cache);
        if (callback && res) {
          callback(res);
        }
      },
    }
  );
  return [mutate, isLoading];
}

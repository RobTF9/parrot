import { useQuery, UseMutateFunction, useMutation } from 'react-query';
import { get, post, put } from './fetch';
import { queryClient } from '../context/Query';

export interface APIReciever<T> {
  (id?: string): [data: { data: T } | undefined, isLoading: boolean];
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
    mutate: UseMutateFunction<ServerReponse<U>, unknown, T, unknown>,
    isLoading: boolean
  ];
}

export function createOne<T, U>(
  cache: string,
  endpoint: string,
  callback?: (res: ServerReponse<U>) => void
): [
  mutate: UseMutateFunction<ServerReponse<U>, unknown, T, unknown>,
  isLoading: boolean
] {
  const { mutate, isLoading } = useMutation(
    (u: T) => post<T, ServerReponse<U>>(endpoint, u),
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

export function updateOne<T, U>(
  cache: string,
  endpoint: string,
  callback?: (res: ServerReponse<U>) => void
): [
  mutate: UseMutateFunction<ServerReponse<U>, unknown, T, unknown>,
  isLoading: boolean
] {
  const { mutate, isLoading } = useMutation(
    (u: T) =>
      put<T, ServerReponse<U>>(endpoint, {
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

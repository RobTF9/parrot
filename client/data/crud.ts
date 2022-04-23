import { useQuery, UseMutateFunction, useMutation } from 'react-query';
import { get, patch, post, put } from './fetch';
import { queryClient } from '../context/Query';
import { useMessageContext } from '../context/Message';

export interface APIReciever<T> {
  (id?: string): [
    data: { data: T } | undefined,
    isLoading: boolean,
    refetch: () => void
  ];
}

export function getMany<T>(
  cache: string,
  endpoint: string,
  query?: string
): [
  data: { data: Array<T> } | undefined,
  isLoading: boolean,
  refetch: () => void
] {
  const { data, isLoading, refetch } = useQuery(cache, () =>
    get<{ data: Array<T> }>(query ? endpoint + query : endpoint)
  );
  return [data, isLoading, refetch];
}

export function getOne<T>(
  cache: string,
  endpoint: string
): [data: { data: T } | undefined, isLoading: boolean, refetch: () => void] {
  const { data, isLoading, refetch } = useQuery(cache, () =>
    get<{ data: T }>(endpoint)
  );
  return [data, isLoading, refetch];
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
  const { showMessage } = useMessageContext();
  const { mutate, isLoading } = useMutation(
    (u: T) => post<T, ServerReponse<U>>(endpoint, u),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(cache);
        if (res) {
          if (res.message) {
            showMessage(res.message);
          }
          if (callback) {
            callback(res);
          }
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
  const { showMessage } = useMessageContext();
  const { mutate, isLoading } = useMutation(
    (u: T) =>
      put<T, ServerReponse<U>>(endpoint, {
        ...u,
        updatedAt: undefined,
      }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(cache);
        if (res) {
          if (res.message) {
            showMessage(res.message);
          }
          if (callback) {
            callback(res);
          }
        }
      },
    }
  );
  return [mutate, isLoading];
}

export function patchOne<T, U>(
  cache: string,
  endpoint: string,
  callback?: (res: ServerReponse<U>) => void
): [
  mutate: UseMutateFunction<ServerReponse<U>, unknown, T, unknown>,
  isLoading: boolean
] {
  const { showMessage } = useMessageContext();
  const { mutate, isLoading } = useMutation(
    (u: T) =>
      patch<T, ServerReponse<U>>(endpoint, {
        ...u,
        updatedAt: undefined,
      }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(cache);
        if (res) {
          if (res.message) {
            showMessage(res.message);
          }
          if (callback) {
            callback(res);
          }
        }
      },
    }
  );
  return [mutate, isLoading];
}

import { useEffect, useState } from 'react';
import { APIReciever } from '../data/crud';
import useDebounce from './useDebounce';

function useSearchQuery<T>(
  getMany: APIReciever<T>
): [
  query: string,
  setQuery: (query: string) => void,
  isLoading: boolean,
  data?: { data: T }
] {
  const [query, setQuery] = useState<string>('');
  const debouncedValue = useDebounce<string>(query, 300);
  const [data, isLoading, refetch] = getMany(query);

  useEffect(() => {
    refetch();
  }, [debouncedValue]);

  return [query, setQuery, isLoading, data];
}

export default useSearchQuery;

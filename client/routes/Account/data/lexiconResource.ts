import { useQuery } from 'react-query';
import { CACHE } from '../../../utils/constants';
import { get } from '../../../utils/fetch';

function useLexicons(): {
  lexicons: Array<LexiconResource>;
  getLoading: boolean;
} {
  const { data: response, isLoading: getLoading } = useQuery(
    CACHE.USER,
    () => get<ServerReponse<LexiconResource[]>>('/api/lexicon'),
    { refetchInterval: false }
  );

  return {
    lexicons: response && response.data ? response.data : [],
    getLoading,
  };
}

export default useLexicons;

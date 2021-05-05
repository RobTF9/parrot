import { UseMutateFunction, useMutation, useQuery } from 'react-query';
import { queryClient } from '../../../context/Query';
import { CACHE } from '../../../utils/constants';
import { get, post } from '../../../utils/fetch';

function lexiconResource(): {
  lexicons: Array<LexiconResource>;
  getLoading: boolean;
  createLoading: boolean;
  createOne: UseMutateFunction<
    ServerReponse<LexiconResource>,
    unknown,
    LexiconSubmission,
    unknown
  >;
} {
  const { data: response, isLoading: getLoading } = useQuery(
    CACHE.LEXICON,
    () => get<ServerReponse<LexiconResource[]>>('/api/lexicon'),
    { refetchInterval: false }
  );

  const { mutate: createOne, isLoading: createLoading } = useMutation(
    (l: LexiconSubmission) =>
      post<LexiconSubmission, ServerReponse<LexiconResource>>(
        '/api/lexicon',
        l
      ),
    {
      onSuccess: () => queryClient.invalidateQueries(CACHE.LEXICON),
    }
  );

  return {
    lexicons: response && response.data ? response.data : [],
    getLoading,
    createOne,
    createLoading,
  };
}

export default lexiconResource;

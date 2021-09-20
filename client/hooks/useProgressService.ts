import { useEffect, useState } from 'react';
import { get } from '../data/fetch';

interface UseProgressService {
  (phrases?: PhraseResource[]): [
    loadingProgress: boolean,
    progress?: ProgressResponse,
    error?: string
  ];
}

const useProgressService: UseProgressService = (phrases) => {
  const [progress, setProgress] = useState<ProgressResponse>();
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [error, setError] = useState<string>();

  const getProgress = async () => {
    const response = await get<ProgressResponse>('/api/progress');

    if (response.data) {
      setProgress(response);
      setLoadingProgress(false);
    } else {
      setError('There was an error with the progress service');
      setLoadingProgress(false);
    }
  };

  useEffect(() => {
    if (phrases) {
      console.log(progress);
      getProgress();
    }
  }, [phrases]);

  return [loadingProgress, progress, error];
};

export default useProgressService;

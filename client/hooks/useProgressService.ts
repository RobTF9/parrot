import { useEffect, useState } from 'react';
import { get } from '../data/fetch';

interface UseProgressService {
  (items?: ItemResource[]): [
    loadingProgress: boolean,
    progress?: ProgressResponse,
    error?: string
  ];
}

const useProgressService: UseProgressService = (items) => {
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
    if (items) {
      console.log(progress);
      getProgress();
    }
  }, [items]);

  return [loadingProgress, progress, error];
};

export default useProgressService;

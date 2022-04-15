import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from '../data/fetch';

type Resources = {
  users: UserResource[];
  phrases: PhraseResource[];
  parrots: ParrotResource[];
  games: GameResource[];
};

type AdminDataResponse = {
  data: Resources;
  admin: boolean;
};

interface UseAdminService {
  (): {
    loading: boolean;
    data?: Resources;
  };
}

const useAdminService: UseAdminService = () => {
  const { push } = useHistory();
  const [data, setData] = useState<Resources | undefined>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await get<AdminDataResponse>('/api/admin');
    if (!response.admin) {
      setLoading(false);
      push('/');
    }

    if (response.data) {
      setData(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading };
};

export default useAdminService;

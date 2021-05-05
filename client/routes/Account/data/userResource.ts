import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { get, put } from '../../../utils/fetch';
import { CACHE } from '../../../utils/constants';
import { queryClient } from '../../../context/Query';
import { validateUpdate } from '../../../utils/userValidators';

function userResource(): {
  details: { email: string; username: string };
  errors: UserSubmission;
  getLoading?: boolean;
  updateLoading?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
} {
  const [errors, setErrors] = useState<UserSubmission>({});
  const [details, setDetails] = useState({
    email: '',
    username: '',
  });

  const { data: response, isLoading: getLoading } = useQuery(
    CACHE.USER,
    () => get<ServerReponse<UserResource>>('/api/user'),
    { refetchInterval: false }
  );

  const { mutate, isLoading: updateLoading } = useMutation(
    (user: UserSubmission) =>
      put<UserSubmission, UserResource>('/api/user', { ...user }),
    {
      onSuccess: () => queryClient.invalidateQueries(CACHE.USER),
    }
  );

  useEffect(() => {
    if (response?.data) {
      setDetails(response.data);
    }
  }, [response]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateUpdate(details);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      mutate(details);
    }
  };

  return { details, errors, getLoading, updateLoading, onChange, onSubmit };
}

export default userResource;

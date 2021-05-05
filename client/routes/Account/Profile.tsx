import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useAuthContext } from '../../context/Auth';
import { get, put } from '../../utils/fetch';
import { Card, Container, Grid } from '../../styles/Layout.styles';
import { CACHE } from '../../utils/constants';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import Input from '../../components/Input';
import { queryClient } from '../../context/Query';
import { validateUpdate } from '../../utils/userValidators';

const Profile: React.FC = () => {
  const { signOut } = useAuthContext();
  const [errors, setErrors] = useState<UserSubmission>({});
  const [details, setDetails] = useState({
    email: '',
    username: '',
  });

  const { data: response, isLoading } = useQuery(
    CACHE.USER,
    () => get<ServerReponse<UserResource>>('/api/user'),
    { refetchInterval: false }
  );

  const { mutate, isLoading: mutationLoading } = useMutation(
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

  return (
    <Container>
      {isLoading && <Loading bg />}
      {response && response.data && (
        <>
          <PageHeader {...{ title: `Hi ${response.data.username}` }}>
            <Button type="button" onClick={signOut}>
              Logout
            </Button>
          </PageHeader>
          <Grid {...{ columns: '40rem 1fr' }}>
            <Card as="form" onSubmit={onSubmit}>
              {mutationLoading && <Loading bg />}
              <h2 className="large bold border-b-s">Update your details</h2>
              <Input
                {...{
                  label: 'Email',
                  name: 'email',
                  value: details.email,
                  error: errors.email,
                  onChange,
                }}
              />
              <Input
                {...{
                  label: 'Username',
                  name: 'username',
                  value: details.username,
                  error: errors.username,
                  onChange,
                }}
              />
              <Button type="submit">Save changes</Button>
            </Card>
            <Card>
              <h2 className="large bold border-b-s">Your Lexicons</h2>
            </Card>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Profile;

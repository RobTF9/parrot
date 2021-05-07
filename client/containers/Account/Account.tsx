import React from 'react';
import { useAuthContext } from '../../context/Auth';
import { Container, Grid } from '../../styles/Layout.styles';
import PageHeader from '../../components/PageHeader';
import { Button } from '../../styles/Buttons.styles';
import UpdateUser from './UpdateUser';
import Lexicons from './Lexicons';

const Profile: React.FC = () => {
  const { signOut } = useAuthContext();

  return (
    <Container>
      <PageHeader {...{ title: `Your account` }}>
        <Button type="button" onClick={signOut}>
          Logout
        </Button>
      </PageHeader>
      <Grid {...{ columns: '40rem 1fr' }}>
        <UpdateUser />
        {/* <Lexicons /> */}
      </Grid>
    </Container>
  );
};

export default Profile;

import React from 'react';
import { useAuthContext } from '../context/Auth';
import NotAuthenticated from './NotAuthenticated';
import Authenticated from './Authenticated';

const Router: React.FC = () => {
  const { authenticated } = useAuthContext();

  return authenticated ? <Authenticated /> : <NotAuthenticated />;
};

export default Router;

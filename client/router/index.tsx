import React from 'react';
import { useAuthContext } from '../context/Auth';
import NotAuthenticated from './NotAuthenticated';
import Authenticated from './Authenticated';
import Loading from '../components/Loading';

const Router: React.FC = () => {
  const { authenticated } = useAuthContext();

  if (authenticated === undefined) return <Loading condition />;

  return authenticated ? <Authenticated /> : <NotAuthenticated />;
};

export default Router;

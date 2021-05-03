import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authentication from './Authentication';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Authentication />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

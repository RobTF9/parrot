import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, useLocation } from 'react-router-dom';

const AnimatedRoute: React.FunctionComponent<{
  path: string;
  exact?: boolean;
}> = ({ children, path, exact }) => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Route
        exact={exact}
        path={path}
        location={location}
        key={location.pathname}
      >
        {children}
      </Route>
    </AnimatePresence>
  );
};

export default AnimatedRoute;

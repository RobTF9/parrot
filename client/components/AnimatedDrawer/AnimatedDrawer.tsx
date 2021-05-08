import { AnimatePresence } from 'framer-motion';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import { Drawer, Overlay, TouchableOpacity } from '../../styles/Layout.styles';
import { fade, moveIn } from '../../utils/animations';

interface Props {
  condition?: boolean;
}

const AnimatedDrawer: React.FunctionComponent<Props> = ({
  children,
  condition,
}) => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  return (
    <AnimatePresence>
      {condition && (
        <Overlay {...{ ...fade }}>
          <Drawer {...{ ...moveIn }}>{children}</Drawer>
          <TouchableOpacity onClick={() => push(pathname)} />
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AnimatedDrawer;

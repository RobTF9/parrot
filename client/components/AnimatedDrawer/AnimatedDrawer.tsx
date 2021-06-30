import { AnimatePresence } from 'framer-motion';
import FocusLock from 'react-focus-lock';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import { Drawer, Overlay, TouchableOpacity } from '../../styles/Layout.styles';
import { fade, moveIn } from '../../utils/animations';

interface Props {
  condition?: boolean;
  back?: (string: 'CLOSED') => void;
}

const AnimatedDrawer: React.FunctionComponent<Props> = ({
  children,
  condition,
  back,
}) => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  return (
    <AnimatePresence>
      {condition && (
        <Overlay {...{ ...fade, zIndex: 600 }}>
          <Drawer {...{ ...moveIn }}>
            <FocusLock>{children}</FocusLock>
          </Drawer>
          <TouchableOpacity
            onClick={() => (back ? back('CLOSED') : push(pathname))}
          />
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AnimatedDrawer;

import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Drawer, Overlay, TouchableOpacity } from '../../styles/Layout.styles';
import { fade, moveIn } from '../../utils/animations';

interface Props {
  back: () => void;
  condition?: boolean;
}

const AnimatedDrawer: React.FunctionComponent<Props> = ({
  children,
  back,
  condition,
}) => {
  return (
    <AnimatePresence>
      {condition && (
        <Overlay {...{ ...fade }}>
          <Drawer {...{ ...moveIn }}>{children}</Drawer>
          <TouchableOpacity onClick={() => back()} />
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AnimatedDrawer;

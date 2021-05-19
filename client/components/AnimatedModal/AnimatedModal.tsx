import React from 'react';
import { Link } from 'react-router-dom';
import {
  Modal,
  Overlay,
  TouchableOpacity,
} from '../../styles/Layout.styles';
import { fade, moveUp } from '../../utils/animations';

const AnimatedModal: React.FunctionComponent<{ back: string }> = ({
  children,
  back,
}) => {
  return (
    <Overlay {...{ ...fade }}>
      <Modal {...{ ...moveUp }}>{children}</Modal>
      <TouchableOpacity as={Link} to={back} />
    </Overlay>
  );
};

export default AnimatedModal;

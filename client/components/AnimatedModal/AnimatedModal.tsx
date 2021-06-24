import React from 'react';
import { Link } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import { Modal, Overlay, TouchableOpacity } from '../../styles/Layout.styles';
import { fade, moveUp } from '../../utils/animations';

const AnimatedModal: React.FunctionComponent<{ back?: string }> = ({
  children,
  back,
}) => {
  return (
    <Overlay {...{ ...fade }}>
      <Modal {...{ ...moveUp }}>
        <FocusLock>{children}</FocusLock>
      </Modal>
      {back && <TouchableOpacity as={Link} to={back} />}
    </Overlay>
  );
};

export default AnimatedModal;

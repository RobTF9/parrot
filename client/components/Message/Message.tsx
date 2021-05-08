import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { FiX } from 'react-icons/fi';
import { slideUp } from '../../utils/animations';
import { MessageWrapper } from './Message.styles';

interface Props {
  message: string;
  type: string;
  visible: boolean;
  hide: () => void;
}

const Message: React.FC<Props> = ({ message, type, visible, hide }) => {
  return (
    <AnimatePresence>
      {visible && (
        <MessageWrapper {...{ ...slideUp }} type={type}>
          <button type="button" onClick={hide}>
            Hide message <FiX />
          </button>
          <p className="bold">{message}</p>
        </MessageWrapper>
      )}
    </AnimatePresence>
  );
};

export default Message;

import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { FiX } from 'react-icons/fi';
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
        <MessageWrapper
          {...{
            initial: {
              opacity: 0,
              y: '100%',
            },
            animate: {
              opacity: 1,
              y: '0%',
            },
            exit: {
              opacity: 0,
              y: '100%',
            },
          }}
          type={type}
        >
          <p className="medium">{message}</p>
          <button type="button" onClick={hide}>
            <FiX />
          </button>
        </MessageWrapper>
      )}
    </AnimatePresence>
  );
};

export default Message;

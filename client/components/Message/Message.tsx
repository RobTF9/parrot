import React from 'react';
import { MessageWrapper } from './Message.styles';

interface Props {
  message: string;
  type: string;
  size?: string;
}

const Message: React.FC<Props> = ({ message, type, size }) => {
  return (
    <MessageWrapper type={type} size={size}>
      <p className="center">{message}</p>
    </MessageWrapper>
  );
};

export default Message;

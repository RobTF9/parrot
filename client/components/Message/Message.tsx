import React from 'react';
import { MessageWrapper } from './Message.styles';

interface Props {
  message: string;
  type: string;
}

const Message: React.FC<Props> = ({ message, type }) => {
  return (
    <MessageWrapper type={type}>
      <p className="center">{message}</p>
    </MessageWrapper>
  );
};

export default Message;

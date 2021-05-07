import React, { createContext, useContext, useState } from 'react';
import Message from '../components/Message';

type Message = {
  type: string;
  visible: boolean;
  message: string;
};

interface IMessageContext {
  updateMessage: (m: Message) => void;
  hideMessage: () => void;
}

const MessageContext = createContext<IMessageContext>({
  updateMessage: () => null,
  hideMessage: () => null,
});

export const useMessageContext = (): IMessageContext =>
  useContext(MessageContext);

export const MessageProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState({
    type: '',
    visible: false,
    message: '',
  });

  const updateMessage = (m: Message) => setMessage(m);

  const hideMessage = () => setMessage({ ...message, visible: false });

  return (
    <MessageContext.Provider value={{ updateMessage, hideMessage }}>
      <Message
        {...{
          message: message.message,
          type: message.type,
          visible: message.visible,
          hide: hideMessage,
        }}
      />
      {children}
    </MessageContext.Provider>
  );
};

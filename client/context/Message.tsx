import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MessageContext = createContext<IMessageContext>({
  showMessage: () => null,
  hideMessage: () => null,
});

export const useMessageContext = (): IMessageContext =>
  useContext(MessageContext);

export const MessageProvider: React.FC = ({ children }) => {
  const location = useLocation();
  const [message, setMessage] = useState({
    type: '',
    visible: false,
    message: '',
  });

  const showMessage = (m: Message) => setMessage(m);

  const hideMessage = () => setMessage({ ...message, visible: false });

  // log instead of displaying message for now
  useEffect(() => {
    console.log(message);
  }, [message]);

  useEffect(() => {
    hideMessage();
  }, [location]);

  return (
    <MessageContext.Provider value={{ showMessage, hideMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

import React, { useState } from 'react';
import Message from '../client/components/Message';

export default {
  title: 'Components/Message',
  component: Message,
};

export const Error = () => {
  return (
    <Message
      {...{
        message: 'This is a message',
        type: 'error',
        visible: true,
      }}
    />
  );
};

export const Success = () => {
  return (
    <Message
      {...{
        message: 'This is a message',
        type: 'success',
        visible: true,
      }}
    />
  );
};

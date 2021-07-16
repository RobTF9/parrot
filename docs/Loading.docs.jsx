import React, { useState } from 'react';
import Loading from '../client/components/Loading';

export default {
  title: 'Components/Loading',
  component: Loading,
};

export const Standard = () => {
  return (
    <Loading
      {...{
        condition: true,
      }}
    />
  );
};

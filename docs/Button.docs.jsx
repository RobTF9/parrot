import React from 'react';
import Button from '../client/components/Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Standard = () => <Button>Create account</Button>;

export const Loading = () => <Button loading>Create account</Button>;

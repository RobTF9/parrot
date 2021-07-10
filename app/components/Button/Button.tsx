import React from 'react';
import { ButtonWrapper } from './Button.styles';

interface Props {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  action?: () => void;
  loading?: boolean;
}

const Button: React.FC<Props> = ({ children, action, type }) => {
  return (
    <ButtonWrapper className="large" type={type || 'button'} onClick={action}>
      {children}
    </ButtonWrapper>
  );
};

export default Button;

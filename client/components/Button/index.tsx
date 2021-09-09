import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonWrapper } from './Button.styles';

interface Props {
  children: string;
  type?: 'button' | 'submit' | 'reset';
  action?: () => void;
  loading?: boolean;
  to?: string;
}

const Button: React.FC<Props> = ({ children, action, type, loading, to }) => {
  if (to) {
    return (
      <ButtonWrapper as={Link} to={to}>
        {children}
      </ButtonWrapper>
    );
  }

  return (
    <ButtonWrapper
      {...{
        loading,
        type: type || 'button',
        onClick: action,
      }}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;

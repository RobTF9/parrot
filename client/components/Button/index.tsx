import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ButtonWrapper } from './styles';

interface Props {
  children: string | ReactElement;
  type?: 'button' | 'submit' | 'reset';
  action?: () => void;
  loading?: boolean;
  disabled?: boolean;
  to?: string;
}

const Button: React.FC<Props> = ({
  children,
  action,
  type,
  loading,
  to,
  disabled,
}) => {
  if (to) {
    return (
      <ButtonWrapper as={Link} to={to} disabled={disabled}>
        {children}
      </ButtonWrapper>
    );
  }

  return (
    <ButtonWrapper
      $loading={loading}
      {...{
        type: type || 'button',
        onClick: action,
        disabled,
      }}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;

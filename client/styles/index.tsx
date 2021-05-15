import React from 'react';
import Color from './Color.styles';
import Reset from './Reset.styles';
import Spacings from './Spacings.styles';
import Typography from './Typography.styles';
import Shadows from './Shadows.styles';

const Styles: React.FC = () => {
  return (
    <>
      <Reset />
      <Color />
      <Spacings />
      <Typography />
      <Shadows />
    </>
  );
};

export default Styles;

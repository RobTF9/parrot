import React from 'react';
import Color from '../../styles/Color.styles';
import Reset from '../../styles/Reset.styles';
import Spacings from '../../styles/Spacings.styles';
import Typography from '../../styles/Typography.styles';
import Shadows from '../../styles/Shadows.styles';

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

import React from 'react';
import Color, { BengaliColors, HindiColors } from './Color.styles';
import Reset from './Reset.styles';
import Spacings from './Spacings.styles';
import Typography from './Typography.styles';
import Shadows from './Shadows.styles';
import { useLexiconContext } from '../context/Lexicon';

const Styles: React.FC = () => {
  const { lexicon } = useLexiconContext();
  return (
    <>
      <Reset />
      <Color />
      {lexicon && lexicon.language.htmlCode === 'bn' && <BengaliColors />}
      {lexicon && lexicon.language.htmlCode === 'hi' && <HindiColors />}
      <Spacings />
      <Typography />
      <Shadows />
    </>
  );
};

export default Styles;

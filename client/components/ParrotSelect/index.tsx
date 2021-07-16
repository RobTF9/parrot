import React from 'react';
import Parrot from '../Parrot';
import { LANGUAGES } from '../../utils/constants';
import { Middle } from '../../styles/Layout.styles';
import { ParrotClickable } from './ParrotSelect.styles';

interface Props {
  lexicons: LexiconResource[];
  action: (v: Language) => void;
}

const ParrotSelect: React.FC<Props> = ({ lexicons, action }) => {
  return (
    <Middle columns="1fr 1fr">
      {LANGUAGES.map((language) => {
        if (!lexicons.find((l) => l.language.name === language.name)) {
          return (
            <ParrotClickable
              key={language.name}
              type="button"
              onClick={() => action(language)}
            >
              <Parrot language={language.name} />
              <p className="medium">{language.name}</p>
            </ParrotClickable>
          );
        }
        return null;
      })}
    </Middle>
  );
};

export default ParrotSelect;

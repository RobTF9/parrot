import React from 'react';
import Parrot from '../components/Parrot';
import { useLexiconContext } from '../context/Lexicon';
import { getLexicons } from '../data/lexiconResource';
import { Main, Middle, Top } from '../styles/Layout.styles';

const PickAParrot: React.FC = () => {
  const [lexicons, lexiconsLoading] = getLexicons();
  const { activateLexicon } = useLexiconContext();

  return (
    <Main>
      <Top>
        <h1 className="xlarge bold">Pick which parrot to teach today</h1>
      </Top>
      <Middle columns="1fr 1fr">
        {lexicons &&
          lexicons.data.map(({ _id, language }) => (
            <button
              type="button"
              key={_id}
              onClick={() => activateLexicon(_id)}
            >
              <Parrot {...{ language: language.name }} />
            </button>
          ))}
      </Middle>
    </Main>
  );
};

export default PickAParrot;

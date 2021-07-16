import React from 'react';
import Parrot from '../components/Parrot';
import { useLexiconContext } from '../context/Lexicon';
import { getLexicons } from '../data/lexiconResource';
import { TouchableOpacity } from '../styles/Interactive.styles';
import { Main, Middle, Top } from '../styles/Layout.styles';
import Loading from '../components/Loading';

const PickAParrot: React.FC = () => {
  const [lexicons, lexiconsLoading] = getLexicons();
  const { activateLexicon } = useLexiconContext();

  return (
    <>
      <Loading condition={lexiconsLoading} />
      <Main>
        <Top>
          <h1 className="xlarge bold">Pick which parrot to teach today</h1>
        </Top>
        <Middle columns="1fr 1fr">
          {lexicons &&
            lexicons.data.map(({ _id, language }) => (
              <TouchableOpacity
                type="button"
                key={_id}
                onClick={() => activateLexicon(_id)}
              >
                <Parrot {...{ language: language.name }} />
                <p className="medium">{language.name}</p>
              </TouchableOpacity>
            ))}
        </Middle>
      </Main>
    </>
  );
};

export default PickAParrot;

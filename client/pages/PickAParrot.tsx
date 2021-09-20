import React from 'react';
import Parrot from '../components/Parrot';
import { useLexiconContext } from '../context/Lexicon';
import { getLexicons } from '../data/lexiconResource';
import { TouchableOpacity } from '../styles/Interactive.styles';
import { Main, StretchBlock, Header } from '../styles/Layout.styles';
import Loading from '../components/Loading';

const PickAParrot: React.FC = () => {
  const [lexicons, lexiconsLoading] = getLexicons();
  const { activateLexicon, lexicon } = useLexiconContext();

  return (
    <>
      <Loading condition={lexiconsLoading} />
      <Main>
        <Header>
          <h1 className="xlarge bold">Pick which parrot to teach today</h1>
        </Header>
        <StretchBlock columns="1fr 1fr">
          {lexicons &&
            lexicons.data.map(({ _id, language }) =>
              lexicon?._id === _id ? (
                <div>
                  <Parrot {...{ language: language.name }} />
                  <p className="medium center">
                    Teaching: <strong>{language.name}</strong>
                  </p>
                </div>
              ) : (
                <TouchableOpacity
                  type="button"
                  key={_id}
                  onClick={() => activateLexicon(_id)}
                >
                  <Parrot {...{ language: language.name }} />
                  <p className="medium">{language.name}</p>
                </TouchableOpacity>
              )
            )}
        </StretchBlock>
      </Main>
    </>
  );
};

export default PickAParrot;

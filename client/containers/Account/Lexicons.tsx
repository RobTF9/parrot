import React from 'react';
import { Redirect } from 'react-router-dom';
import { Loading } from '../../styles/Animations.styles';
import { Card } from '../../styles/Layout.styles';
import { getLexicons } from '../../api/resources/lexicon';
import { useLexiconContext } from '../../context/Lexicon';

const Lexicons: React.FC = () => {
  const { lexicon, activateLexicon } = useLexiconContext();
  const [lexicons, getLoading] = getLexicons();

  return (
    <Card>
      {getLoading && <Loading bg />}
      <h2 className="large bold border-b-s">Your Lexicons</h2>
      <ul>
        {lexicons && lexicons.data.length > 0
          ? lexicons.data.map(({ language, _id }) => (
              <li key={_id}>
                {lexicon === _id && 'Active: '}
                <button type="button" onClick={() => activateLexicon(_id)}>
                  {language.name}
                </button>
              </li>
            ))
          : !getLoading && <Redirect to="/no-lexicon" />}
      </ul>
    </Card>
  );
};

export default Lexicons;

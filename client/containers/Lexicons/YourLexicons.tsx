import React from 'react';
import LexiconList from '../../components/LexiconList';
import { Loading } from '../../styles/Animations.styles';
import { useLexiconContext } from '../../context/Lexicon';
import { getLexicons } from '../../api/resources/lexicon';

const YourLexicons: React.FC = () => {
  const { lexicon, activateLexicon } = useLexiconContext();
  const [yourLexicons, yoursLoading] = getLexicons();

  return (
    <>
      {yoursLoading && <Loading bg />}
      <h2 className="large bold border-b-s">Your Lexicons</h2>
      {yourLexicons && (
        <LexiconList
          {...{
            lexicon,
            lexicons: yourLexicons,
            activate: activateLexicon,
            emptyMessage: "You haven't created any lexicons",
            share: true,
          }}
        />
      )}
    </>
  );
};

export default YourLexicons;

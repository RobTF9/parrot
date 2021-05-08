import React from 'react';
import LexiconList from '../../components/LexiconList';
import { Loading } from '../../styles/Animations.styles';
import { useLexiconContext } from '../../context/Lexicon';

const SharedLexicons: React.FC = () => {
  const {
    lexicon,
    activateLexicon,
    sharedLexicons,
    sharedLoading,
  } = useLexiconContext();

  return (
    <>
      {sharedLoading && <Loading bg />}
      <h3 className="large bold border-b-s">Shared with you</h3>
      {sharedLexicons && (
        <LexiconList
          {...{
            lexicon,
            lexicons: sharedLexicons,
            activate: activateLexicon,
            emptyMessage: 'No one has shared a lexicon with you',
          }}
        />
      )}
    </>
  );
};

export default SharedLexicons;

import React from 'react';
import LexiconList from '../../components/LexiconList';
import { Loading } from '../../styles/Animations.styles';
import { Container, Modal } from '../../styles/Layout.styles';
import { useLexiconContext } from '../../context/Lexicon';
import { getLexicons, getShared } from '../../api/resources/lexicon';

const NoActiveLexicon: React.FC = () => {
  const { lexicon, activateLexicon } = useLexiconContext();
  const [yourLexicons, yoursLoading] = getLexicons();
  const [sharedLexicons, sharedLoading] = getShared();

  return (
    <Container half>
      <h1 className="xlarge center lightest buffer">
        Welcome to <span className="bold">Parrot</span>
      </h1>
      <Modal>
        {(yoursLoading || sharedLoading) && <Loading bg />}
        <h2 className="xxlarge bold">Select a lexicon to get started</h2>
        <p className="margin-b">
          Lexicons are collections of words, sentences and games. You can keep
          them to yourself or share them with others
        </p>
        <h3 className="large bold border-b-s">Created by you</h3>
        {yourLexicons && (
          <LexiconList
            {...{
              lexicon,
              lexicons: yourLexicons,
              activate: activateLexicon,
              emptyMessage: "You haven't created any lexicons",
            }}
          />
        )}
        <h3 className="large bold border-b-s margin-t-l">Shared with you</h3>
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
      </Modal>
    </Container>
  );
};

export default NoActiveLexicon;

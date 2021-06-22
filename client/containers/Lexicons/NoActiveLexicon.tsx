import React from 'react';
import LexiconList from '../../components/LexiconList';
import { Loading } from '../../styles/Animations.styles';
import { Container, Modal } from '../../styles/Layout.styles';
import { useLexiconContext } from '../../context/Lexicon';
import { getLexicons } from '../../api/resources/lexicon';

const NoActiveLexicon: React.FC = () => {
  const { lexicon, activateLexicon } = useLexiconContext();
  const [yourLexicons, yoursLoading] = getLexicons();

  return (
    <Container half>
      <h1 className="xlarge center lightest buffer">
        Welcome to <span className="bold">Parrot</span>
      </h1>
      <Modal>
        {yoursLoading && <Loading bg />}
        <h2 className="xxlarge bold border-b-s">
          Select a lexicon to get started
        </h2>
        <p className="margin-b">
          Lexicons are collections of words, sentences and games. You can keep
          them to yourself or share them with others
        </p>
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
      </Modal>
    </Container>
  );
};

export default NoActiveLexicon;

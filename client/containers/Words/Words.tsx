import React from 'react';
import { getWords } from '../../api/resources/word';
import PageHeader from '../../components/PageHeader';
import WordList from '../../components/WordList';
import { Loading } from '../../styles/Animations.styles';
import { Container } from '../../styles/Layout.styles';

const Words: React.FC = () => {
  const [words, wordsLoading] = getWords();

  return (
    <Container>
      <PageHeader title="Words" />
      {wordsLoading && <Loading bg />}
      {words && <WordList {...{ words }} />}
    </Container>
  );
};

export default Words;

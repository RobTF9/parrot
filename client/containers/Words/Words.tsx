import React from 'react';
import { getWords } from '../../api/resources/word';
import AnimatedRoute from '../../components/AnimateRoute';
import PageHeader from '../../components/PageHeader';
import WordList from '../../components/WordList';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container } from '../../styles/Layout.styles';
import UpdateWord from './UpdateWord';

const Words: React.FC = () => {
  const [words, wordsLoading] = getWords();

  return (
    <>
      <AnimatedRoute path="/words/:id">
        <UpdateWord />
      </AnimatedRoute>
      <Container>
        <PageHeader title="Words">
          <Button>Add a new word</Button>
        </PageHeader>
        {wordsLoading && <Loading bg />}
        {words && <WordList {...{ words }} />}
      </Container>
    </>
  );
};

export default Words;

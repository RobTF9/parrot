import React from 'react';
import { Link, Switch } from 'react-router-dom';
import { getWords } from '../../api/resources/word';
import AnimatedRoute from '../../components/AnimateRoute';
import PageHeader from '../../components/PageHeader';
import WordList from '../../components/WordList';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container } from '../../styles/Layout.styles';
import UpdateWord from './UpdateWord';
import CreateWord from './CreateWord';
import { getTags } from '../../api/resources/tags';
import NoWords from './NoWords';

const Words: React.FC = () => {
  const [words, wordsLoading] = getWords();
  const [tags, tagsLoading] = getTags();

  return (
    <>
      {words && words.data.length === 0 && <NoWords />}
      <Switch>
        <AnimatedRoute exact path="/words/new">
          <CreateWord />
        </AnimatedRoute>
        <AnimatedRoute path="/words/:id">
          <UpdateWord />
        </AnimatedRoute>
      </Switch>
      <Container>
        <PageHeader title="Words">
          <Button as={Link} to="/words/new">
            Add a new word
          </Button>
        </PageHeader>
        {(wordsLoading || tagsLoading) && <Loading bg />}
        {words && tags && <WordList {...{ words, tags }} />}
      </Container>
    </>
  );
};

export default Words;

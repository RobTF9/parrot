import React from 'react';
import { Link, Switch } from 'react-router-dom';
import { getSentences } from '../../api/resources/sentence';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container } from '../../styles/Layout.styles';
import { getTags } from '../../api/resources/tags';
import AnimatedRoute from '../../components/AnimateRoute';
import SentenceList from '../../components/SentenceList';
import CreateSentence from './CreateSentence';
import UpdateSentence from './UpdateSentence';
import NoSentences from './NoSentences';

const Sentences: React.FC = () => {
  const [sentences, sentencesLoading] = getSentences();
  const [tags, tagsLoading] = getTags();

  return (
    <>
      {sentences && sentences.data.length === 0 && <NoSentences />}
      <Switch>
        <AnimatedRoute exact path="/sentences/new">
          <CreateSentence />
        </AnimatedRoute>
        <AnimatedRoute path="/sentences/:id">
          <UpdateSentence />
        </AnimatedRoute>
      </Switch>
      <Container>
        <PageHeader title="Sentences">
          <Button as={Link} to="/sentences/new">
            Add a new sentence
          </Button>
        </PageHeader>
        {(sentencesLoading || tagsLoading) && <Loading bg />}
        {sentences && tags && <SentenceList {...{ sentences, tags }} />}
      </Container>
    </>
  );
};

export default Sentences;

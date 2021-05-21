import React from 'react';
import { Link } from 'react-router-dom';
import { getSentences } from '../../api/resources/sentence';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container } from '../../styles/Layout.styles';
import { getTags } from '../../api/resources/tags';
import SentenceList from '../../components/SentenceList';

const Sentences: React.FC = () => {
  const [sentences, sentencesLoading] = getSentences();
  const [tags, tagsLoading] = getTags();

  return (
    <Container>
      <PageHeader title="Sentences">
        <Button as={Link} to="/sentences/new">
          Add a new sentence
        </Button>
      </PageHeader>
      {(sentencesLoading || tagsLoading) && <Loading bg />}
      {sentences && tags && <SentenceList {...{ sentences, tags }} />}
    </Container>
  );
};

export default Sentences;

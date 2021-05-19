import React from 'react';
import { getWords } from '../../api/resources/word';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Card, Container, Grid } from '../../styles/Layout.styles';

const Words: React.FC = () => {
  const [words, wordsLoading] = getWords();
  return (
    <Container>
      <PageHeader title="Words" />
      {wordsLoading && <Loading bg />}
      <Grid as="ul">
        {words &&
          words.data.map((word) => (
            <Card as="li" key={word._id}>
              {word.tran}
            </Card>
          ))}
      </Grid>
    </Container>
  );
};

export default Words;

import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getGame, updateGame } from '../../api/resources/game';
import { Loading } from '../../styles/Animations.styles';
import { getItems } from '../../api/resources/items';
import GameForm from '../../components/GameForm';
import { Card, Container, GridOverlap } from '../../styles/Layout.styles';
import PageHeader from '../../components/PageHeader';
import TagList from '../../components/TagList';
import { getTags } from '../../api/resources/tags';
import ResultChart from '../../components/ResultChart';
import { Button } from '../../styles/Buttons.styles';
import { newResult } from '../../api/resources/results';
import { useMessageContext } from '../../context/Message';

const UpdateGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showMessage } = useMessageContext();
  const { push } = useHistory();
  const [items, itemsLoading] = getItems();
  const [game, gameLoading] = getGame(id);
  const [tags, tagsLoading] = getTags();
  const [update, updateLoading] = updateGame(id);
  const [newGame, newGameLoading] = newResult(undefined, (res) => {
    if (res.data) {
      push(`/play/${res.data._id}`);
    }
  });

  return (
    <Container>
      {(gameLoading || updateLoading || itemsLoading || tagsLoading) && (
        <Loading bg />
      )}
      {game && tags && (
        <>
          <PageHeader title={game.data.name}>
            <Button type="button" onClick={() => newGame({ game: id })}>
              {newGameLoading ? <Loading bg /> : 'Start a new game'}
            </Button>
            <TagList items={game.data.items} tags={tags.data} />
          </PageHeader>
          <GridOverlap
            className="margin-b-xl"
            columns="45rem 1fr"
            breakpoints={[
              { width: '960px', columns: '1fr 1fr' },
              { width: '600px', columns: '1fr' },
            ]}
          >
            <Card>
              <h3 className="xlarge bold">Edit game</h3>
              {items && (
                <GameForm
                  {...{
                    initialGame: game.data,
                    items: items.data,
                    mutate: update,
                    showMessage,
                  }}
                />
              )}
            </Card>
            <Card>
              <h3 className="xlarge bold">Results</h3>
              {game.data.results.length === 0 ? (
                <p className="margin-t">
                  Once you&apos;ve played this game for the first time your
                  results will appear here.
                </p>
              ) : (
                game.data.results.map((result) => (
                  <ResultChart key={result._id} result={result} />
                ))
              )}
            </Card>
          </GridOverlap>
        </>
      )}
    </Container>
  );
};

export default UpdateGame;

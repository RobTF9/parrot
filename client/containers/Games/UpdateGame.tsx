import React from 'react';
import { useParams } from 'react-router-dom';
import { getGame, updateGame } from '../../api/resources/game';
import { Loading } from '../../styles/Animations.styles';
import { getItems } from '../../api/resources/items';
import GameForm from '../../components/GameForm';
import { Card, Container, Grid, GridOverlap } from '../../styles/Layout.styles';
import PageHeader from '../../components/PageHeader';
import TagList from '../../components/TagList';
import { getTags } from '../../api/resources/tags';

const UpdateGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [items, itemsLoading] = getItems();
  const [game, gameLoading] = getGame(id);
  const [tags, tagsLoading] = getTags();
  const [update, updateLoading] = updateGame(id);

  return (
    <Container>
      {(gameLoading || updateLoading || itemsLoading || tagsLoading) && (
        <Loading bg />
      )}
      {game && tags && (
        <>
          <PageHeader title={game.data.name}>
            <TagList items={game.data.items} tags={tags.data} />
          </PageHeader>
          <GridOverlap
            columns="45rem 1fr"
            breakpoints={[
              { width: '960px', columns: '1fr 1fr' },
              { width: '600px', columns: '1fr' },
            ]}
          >
            <Card>
              {items && (
                <GameForm
                  {...{
                    initialGame: game.data,
                    items: items.data,
                    mutate: update,
                  }}
                />
              )}
            </Card>
            <Grid>
              {game.data.items.map((item) => (
                <p key={item._id}>{item._id}</p>
              ))}
            </Grid>
          </GridOverlap>
        </>
      )}
    </Container>
  );
};

export default UpdateGame;

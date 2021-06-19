import React from 'react';
import { useParams } from 'react-router-dom';
import { getGame, updateGame } from '../../api/resources/game';
import { Loading } from '../../styles/Animations.styles';
import { getItems } from '../../api/resources/items';
import GameForm from '../../components/GameForm';
import { Card, Container, Grid } from '../../styles/Layout.styles';
import PageHeader from '../../components/PageHeader';

const UpdateGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [items, itemsLoading] = getItems();
  const [game, gameLoading] = getGame(id);
  const [update, updateLoading] = updateGame(id);

  return (
    <Container>
      {(gameLoading || updateLoading || itemsLoading) && <Loading bg />}
      {game && (
        <>
          <PageHeader title={game.data.name} />
          <Grid
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
          </Grid>
        </>
      )}
    </Container>
  );
};

export default UpdateGame;

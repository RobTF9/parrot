import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../styles/Buttons.styles';
import { Grid } from '../../styles/Layout.styles';

interface Props {
  result: ResultResource;
}

const GridMode: React.FC<Props> = ({ result }) => {
  return (
    <Grid columns="repeat(auto-fill, minmax(300px, 1fr))">
      {result.items.map(({ item }) => (
        <Button
          as={Link}
          key={item._id}
          to={`/play/${result.game._id}/${item._id}`}
        >
          {item.lang} – {item.tran}
        </Button>
      ))}
    </Grid>
  );
};

export default GridMode;

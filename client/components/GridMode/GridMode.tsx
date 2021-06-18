import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button } from '../../styles/Buttons.styles';
import { Grid } from '../../styles/Layout.styles';

interface Props {
  result: ResultResource;
}

const GridMode: React.FC<Props> = ({ result }) => {
  return (
    <Grid columns="repeat(auto-fill, minmax(300px, 1fr))">
      {result.items.map(({ item, correct }) =>
        correct ? (
          <Button disabled positive key={item._id}>
            <FiCheck />
            {item.lang} – {item.tran} – {item.pron}
          </Button>
        ) : (
          <Button
            as={Link}
            key={item._id}
            to={`/play/${result.game._id}/${item._id}`}
          >
            {item.lang} – {item.tran}
          </Button>
        )
      )}
    </Grid>
  );
};

export default GridMode;

import React from 'react';
import { FiCheck, FiMic, FiX } from 'react-icons/fi';
import { Grid } from '../../styles/Layout.styles';
import { GridCard } from './GridMode.styles';
import attemptText from '../../utils/attemptText';

interface Props {
  result: ResultResource;
}

const GridMode: React.FC<Props> = ({ result }) => {
  return (
    <Grid columns="repeat(auto-fill, minmax(300px, 1fr))">
      {result.items.map(({ item, correct, attempts, skipped }) => (
        <GridCard
          key={item._id}
          correct={correct}
          skipped={skipped}
          as="button"
          type="button"
          disabled={correct}
        >
          <div>{correct ? <FiCheck /> : skipped ? <FiX /> : <FiMic />}</div>
          <p className="bold">{item.lang}</p>
          <p className="border-b-s">{item.tran}</p>
          <p className="small">{attemptText(correct, skipped, attempts)}</p>
        </GridCard>
      ))}
    </Grid>
  );
};

export default GridMode;

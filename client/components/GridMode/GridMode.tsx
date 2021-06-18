import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiMic, FiX } from 'react-icons/fi';
import { GridCard, GridModeGrid } from './GridMode.styles';
import attemptText from '../../utils/attemptText';
import PageHeader from '../PageHeader';
import capitalize from '../../utils/capitalize';

interface Props {
  result: ResultResource;
}

const GridMode: React.FC<Props> = ({ result }) => {
  return (
    <>
      <PageHeader title={capitalize(result.game.name)}>
        <p>Click on a card and say the word or sentence</p>
      </PageHeader>
      <GridModeGrid columns="repeat(auto-fill, minmax(300px, 1fr))">
        {result.items.map(({ item, correct, attempts, skipped }) => (
          <GridCard
            key={item._id}
            correct={correct}
            skipped={skipped}
            as={Link}
            to="/"
          >
            <div>{correct ? <FiCheck /> : skipped ? <FiX /> : <FiMic />}</div>
            <p className="bold">{item.lang}</p>
            <p className="border-b-s">{item.tran}</p>
            <p className="small">{attemptText(correct, skipped, attempts)}</p>
          </GridCard>
        ))}
      </GridModeGrid>
    </>
  );
};

export default GridMode;

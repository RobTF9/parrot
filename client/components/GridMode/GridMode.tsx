import React from 'react';
import { UseMutateFunction } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { FiCheck, FiMic, FiX } from 'react-icons/fi';
import { GridCard, GridModeGrid } from './GridMode.styles';
import attemptText from '../../utils/attemptText';
import PageHeader from '../PageHeader';
import capitalize from '../../utils/capitalize';
import AnimatedRoute from '../AnimateRoute';
import Listener from '../Listener';

interface Props {
  result: ResultResource;
  update: UseMutateFunction<
    ServerReponse<ResultResource>,
    unknown,
    ResultSubmission,
    unknown
  >;
}

const GridMode: React.FC<Props> = ({ result, update }) => {
  const { question } = useParams<{ game: string; question: string }>();
  return (
    <>
      <AnimatedRoute path={`/play/${result.game._id}/:question`}>
        <Listener {...{ result, id: question, update }} />
      </AnimatedRoute>
      <PageHeader title={capitalize(result.game.name)}>
        <p>Click on a card and say the word or sentence</p>
        <Link className="light" to={`/games/${result.game._id}`}>
          Back
        </Link>
      </PageHeader>
      <GridModeGrid columns="repeat(auto-fill, minmax(300px, 1fr))">
        {result.items.map(({ item, correct, attempts, skipped }) =>
          correct || skipped ? (
            <GridCard
              key={item._id}
              correct={correct && correct}
              skipped={skipped && skipped}
            >
              <div>{correct ? <FiCheck /> : <FiX />}</div>
              <p className="bold">{item.lang}</p>
              <p className="border-b-s">{item.tran}</p>
              <p className="small">{attemptText(correct, skipped, attempts)}</p>
            </GridCard>
          ) : (
            <GridCard
              key={item._id}
              as={Link}
              to={`/play/${result.game._id}/${item._id}`}
            >
              <div>
                <FiMic />
              </div>
              <p className="bold">{item.lang}</p>
              <p className="border-b-s">{item.tran}</p>
              <p className="small">{attemptText(correct, skipped, attempts)}</p>
            </GridCard>
          )
        )}
      </GridModeGrid>
    </>
  );
};

export default GridMode;

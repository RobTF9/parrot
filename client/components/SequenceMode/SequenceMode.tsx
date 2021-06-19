import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UseMutateFunction } from 'react-query';
import { SequenceModeWrapper } from './SequenceMode.styles';
import Listener from '../Listener';
import attemptText from '../../utils/attemptText';

interface Props {
  result: ResultResource;
  updateLoading: boolean;
  update: UseMutateFunction<
    ServerReponse<ResultResource>,
    unknown,
    ResultSubmission,
    unknown
  >;
}
const SequenceMode: React.FC<Props> = ({ result, update, updateLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (result.items[progress].correct || result.items[progress].skipped) {
      setTimeout(() => {
        setProgress(
          result.items.filter(({ correct, skipped }) => correct || skipped)
            .length
        );
      }, 2000);
    }
  }, [updateLoading]);

  return (
    <SequenceModeWrapper>
      <header>
        <Link to="/games" className="light">
          Back
        </Link>
        <h1 className="bold xlarge">{result.game.name}</h1>
      </header>

      {result.items.map(
        ({ item, correct, attempts, skipped }, index) =>
          index === progress && (
            <Fragment key={item._id}>
              <Listener
                centered
                result={result}
                id={item._id}
                update={update}
              />
              <p>{attemptText(correct, skipped, attempts)}</p>
            </Fragment>
          )
      )}
    </SequenceModeWrapper>
  );
};

export default SequenceMode;

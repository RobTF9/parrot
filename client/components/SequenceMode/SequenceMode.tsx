import React from 'react';
import { UseMutateFunction } from 'react-query';
import { SequenceModeWrapper } from './SequenceMode.styles';
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
const SequenceMode: React.FC<Props> = ({ result, update }) => {
  const progress = result.items.filter(
    ({ correct, skipped }) => correct || skipped
  ).length;

  return (
    <SequenceModeWrapper>
      <h1 className="medium bold">{result.game.name}</h1>
      {result.items.map(
        ({ item }, index) =>
          index === progress && (
            <Listener
              centered
              key={item._id}
              result={result}
              id={item._id}
              update={update}
            />
          )
      )}
    </SequenceModeWrapper>
  );
};

export default SequenceMode;

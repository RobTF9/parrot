import React from 'react';
import { ProgressWrapper } from './Progress.styles';

interface Props {
  result: ResultResource;
}

const Progress: React.FC<Props> = ({ result }) => {
  const progress = result.items.filter(
    ({ correct, skipped }) => correct || skipped
  ).length;

  const percentage = (progress / result.score.total) * 100;

  return (
    <ProgressWrapper {...{ percentage }}>
      <p>Your progress</p>
      <div />
      <p>
        {progress} / {result.score.total}
      </p>
    </ProgressWrapper>
  );
};

export default Progress;

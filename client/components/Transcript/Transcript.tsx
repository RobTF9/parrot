import React from 'react';
import { TranscriptWrapper } from './Transcript.styles';

interface Props {
  value: string;
}

const Transcript: React.FC<Props> = ({ value }) => {
  return (
    <TranscriptWrapper>
      <p>{value}</p>
    </TranscriptWrapper>
  );
};

export default Transcript;

import React from 'react';
import { MicrophoneWrapper } from './Microphone.styles';

interface Props {
  value: string;
}

const Microphone: React.FC<Props> = ({ value }) => {
  return (
    <MicrophoneWrapper>
      <p>{value}</p>
    </MicrophoneWrapper>
  );
};

export default Microphone;

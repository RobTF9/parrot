import React from 'react';
import { FiMic } from 'react-icons/fi';
import { MicrophoneWrapper } from './styles';

interface Props {
  listening: boolean;
}

const Microphone: React.FC<Props> = ({ listening }) => {
  return (
    <MicrophoneWrapper {...{ listening }}>
      <FiMic />
    </MicrophoneWrapper>
  );
};

export default Microphone;

import React from 'react';
import { FiCheck, FiMic, FiX } from 'react-icons/fi';
import { MicrophoneWrapper } from './Microphone.styles';

interface Props {
  correct: boolean;
  incorrect: boolean;
  listening: boolean;
}

const Microphone: React.FC<Props> = ({ correct, incorrect, listening }) => {
  const icon = (): JSX.Element => {
    if (correct) {
      return <FiCheck />;
    }
    if (incorrect) {
      return <FiX />;
    }
    return <FiMic />;
  };

  return (
    <MicrophoneWrapper {...{ correct, incorrect, listening }}>
      {icon()}
    </MicrophoneWrapper>
  );
};

export default Microphone;

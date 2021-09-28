import React from 'react';
import { NoSpeechWrapper } from './styles';

const NoSpeech: React.FC = () => {
  return (
    <NoSpeechWrapper>
      <p>
        Unfortunatley your browser doesn&apos;t support the technology we use
        for speech recognition. Visit{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility">
          this page
        </a>{' '}
        to find out which browsers do.
      </p>
    </NoSpeechWrapper>
  );
};

export default NoSpeech;

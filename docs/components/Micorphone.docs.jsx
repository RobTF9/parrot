import React from 'react';
import Microphone from '../../client/components/Microphone';

export default {
  title: 'Components/Microphone',
  component: Microphone,
};

export const Listening = () => (
  <Microphone {...{ listening: true, correct: false, incorrect: false }} />
);

export const Incorrect = () => (
  <Microphone {...{ listening: true, correct: false, incorrect: true }} />
);

export const Correct = () => (
  <Microphone {...{ listening: true, correct: true, incorrect: false }} />
);

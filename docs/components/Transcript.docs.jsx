import React from 'react';
import Transcript from '../../client/components/Transcript';

export default {
  title: 'Components/Transcript',
  component: Transcript,
  parameters: {
    backgrounds: {
      default: '--core-mid',
      values: [{ name: '--core-mid', value: 'rgba(63, 105, 212, 1)' }],
    },
  },
};

export const NoTranscript = () => <Transcript />;

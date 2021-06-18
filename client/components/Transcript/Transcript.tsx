import React from 'react';
import { motion } from 'framer-motion';
import { TranscriptWrapper } from './Transcript.styles';

interface Props {
  transcript?: string;
}

const Transcript: React.FC<Props> = ({ transcript }) => {
  return (
    <TranscriptWrapper>
      {!transcript || transcript.trim() === '' ? (
        <ul>
          <motion.li
            {...{
              animate: { scale: 1.5, opacity: 0.5 },
              transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.2,
              },
            }}
          />
          <motion.li
            {...{
              animate: { scale: 1.5, opacity: 0.5 },
              transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.4,
              },
            }}
          />
          <motion.li
            {...{
              animate: { scale: 1.5, opacity: 0.5 },
              transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.6,
              },
            }}
          />
        </ul>
      ) : (
        <p>{transcript}</p>
      )}
    </TranscriptWrapper>
  );
};

export default Transcript;

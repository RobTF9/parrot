import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { LoadingWrapper } from './Loading.styles';

interface Props {
  condition?: boolean;
}

const Loading: React.FC<Props> = ({ condition }) => {
  return <AnimatePresence>{condition && <LoadingWrapper />}</AnimatePresence>;
};

export default Loading;

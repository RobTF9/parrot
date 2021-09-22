import React from 'react';
import { ListenerWrapper } from './Listener.styles';

interface ProgressPhrase extends PhraseResource {
  attempted: boolean;
  correct: boolean;
}

interface Props {
  phrase: ProgressPhrase;
}

const Listener: React.FC<Props> = ({ phrase }) => {
  return (
    <ListenerWrapper>
      <p>Can you say {phrase.lang}</p>
    </ListenerWrapper>
  );
};

export default Listener;

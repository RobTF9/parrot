import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UseMutateFunction } from 'react-query';
import useSpeech from '../../hooks/useSpeech';
import { Overlay } from '../../styles/Layout.styles';
import { ListenerInner } from './Listener.styles';
import Microphone from '../Microphone';
import { bumpUp } from '../../utils/animations';

interface Props {
  result: ResultResource;
  id: string;
  update: UseMutateFunction<
    ServerReponse<ResultResource>,
    unknown,
    ResultSubmission,
    unknown
  >;
}

const Listener: React.FC<Props> = ({ result, id, update }) => {
  const { push } = useHistory();
  const index = result.items.findIndex((i) => i.item._id === id);

  const { item, correct, skipped } = result.items[index];

  const listenerCallback = (commandCorrect?: boolean) => {
    const { items } = result;
    items[index].attempts += 1;

    if (commandCorrect) {
      items[index].correct = true;
    }

    const newResult = { ...result, items, game: result.game._id };
    update(newResult);
  };

  const { transcript, listening } = useSpeech(item.lang, listenerCallback);

  useEffect(() => {
    if (correct) {
      setTimeout(() => {
        push(`/play/${result.game._id}`);
      }, 1000);
    }
  }, [correct]);

  return (
    <Overlay as={Link} {...{ ...bumpUp }} to={`/play/${result.game._id}`}>
      <ListenerInner>
        <Microphone {...{ listening, correct, incorrect: skipped }} />
        <h3 className="large">
          Say <span className="bold">{item.lang}</span>
        </h3>
        <p>{transcript || '...'}</p>
      </ListenerInner>
    </Overlay>
  );
};

export default Listener;

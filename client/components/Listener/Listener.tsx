import React from 'react';
import { UseMutateFunction } from 'react-query';
import useSpeech from '../../hooks/useSpeech';
import { Overlay } from '../../styles/Layout.styles';
import { ListenerInner } from './Listener.styles';
import Transcript from '../Transcript';

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
  const index = result.items.findIndex((i) => i.item._id === id);

  const { item } = result.items[index];

  const listenerCallback = (commandCorrect?: boolean) => {
    const { items } = result;
    items[index].attempts += 1;

    if (commandCorrect) {
      items[index].correct = true;
    }

    const newResult = { ...result, items, game: result.game._id };
    update(newResult);
  };

  const { transcript } = useSpeech(item.lang, listenerCallback);

  return (
    <Overlay>
      <ListenerInner>
        <h3 className="large">
          Say <span className="bold">{item.lang}</span>
        </h3>
        <Transcript {...{ transcript }} />
      </ListenerInner>
    </Overlay>
  );
};

export default Listener;

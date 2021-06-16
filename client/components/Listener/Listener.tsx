import React from 'react';
import { UseMutateFunction } from 'react-query';
import useSpeech from '../../hooks/useSpeech';

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

  const { item, correct } = result.items[index];

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
    <div>
      <h3 className="xxlarge bold">Can you say {item.lang}</h3>
      <p>{transcript}</p>
      {correct && <p>Correct!</p>}
    </div>
  );
};

export default Listener;

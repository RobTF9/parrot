import React, { useState } from 'react';
import { createGame } from '../../api/resources/game';
import AnimatedModal from '../../components/AnimatedModal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { GAME_TYPE } from '../../utils/constants';
import capitalize from '../../utils/capitalize';
import { Button } from '../../styles/Buttons.styles';
import { getWords } from '../../api/resources/word';
import { getSentences } from '../../api/resources/sentence';
import { Loading } from '../../styles/Animations.styles';

const CreateGame: React.FC = () => {
  const [create, createGameLoading] = createGame();
  const [words, wordsLoading] = getWords();
  const [sentences, sentencesLoading] = getSentences();

  const initialGame = {
    name: '',
    mode: 'GRID',
    sentences: [],
    words: [],
  };

  const [game, setGame] = useState<GameSubmission>(initialGame);

  const gameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setGame({ ...game, [event.target.name]: event.target.value });

  const gameSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(game);
  };

  return (
    <AnimatedModal back="/games">
      {(wordsLoading || sentencesLoading || createGameLoading) && (
        <Loading bg />
      )}
      <h3 className="bold border-b-s xlarge">Create a new game</h3>
      <form onSubmit={gameSubmitHandler}>
        <Input
          {...{
            name: 'name',
            label: 'Game name',
            value: game.name,
            onChange: gameChangeHandler,
          }}
        />
        <Select
          {...{
            name: 'mode',
            label: 'Pick a game type',
            defaultValue: game.mode,
            options: Object.values(GAME_TYPE).map((type) => ({
              value: type,
              copy: capitalize(type),
            })),
            onChange: gameChangeHandler,
          }}
        />
        <Button type="submit">Save game</Button>
      </form>
    </AnimatedModal>
  );
};

export default CreateGame;

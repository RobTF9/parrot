import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import Button from '../Button';
import { ProgressWrapper } from './Progress.styles';

interface Props {
  progress: ProgressResponse;
}

const Progress: React.FC<Props> = ({ progress }) => {
  const { phrase, games } = progress.data;

  const dailyPhraseGoalNotCompleted = phrase.added < phrase.goal;

  return (
    <ProgressWrapper>
      <div
        className={
          phrase.added >= phrase.goal ? 'complete border-b' : 'border-b'
        }
      >
        <p className="mid small">Phrase goal</p>
        <p className="xxlarge bold margin-b">
          {phrase.added >= phrase.goal && <FiCheckCircle />}
          {phrase.added} / {phrase.goal} added
        </p>
        <Button to="/phrase">Teach your parrot a phrase</Button>
      </div>
      <div
        className={
          games.finished >= games.goal ? 'complete border-b' : 'border-b'
        }
      >
        <p className="mid small">Game goal</p>
        <p className="xxlarge bold margin-b">
          {games.finished >= games.goal && <FiCheckCircle />}
          {games.finished} / {games.goal} played
        </p>
        <Button to="/play" disabled={dailyPhraseGoalNotCompleted}>
          Create a game from phrases
        </Button>
        {dailyPhraseGoalNotCompleted && (
          <p className="error">Reach your daily phrase goal to play a game.</p>
        )}
      </div>
    </ProgressWrapper>
  );
};

export default Progress;

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
      <div className={phrase.added >= phrase.goal ? 'complete' : ''}>
        <p className="small">Phrase goal</p>
        <p className="bold">
          {phrase.added >= phrase.goal && <FiCheckCircle />}
          {phrase.added} / {phrase.goal} added
        </p>
        <Button to="/phrase">Add a phrase</Button>
      </div>
      <div className={games.finished >= games.goal ? 'complete' : ''}>
        <p className="small">Game goal</p>
        <p className="bold">
          {games.finished >= games.goal && <FiCheckCircle />}
          {games.finished} / {games.goal} played
        </p>
        <Button to="/play" disabled={dailyPhraseGoalNotCompleted}>
          Play a game
        </Button>
        {dailyPhraseGoalNotCompleted && (
          <p className="error">Reach your daily phrase goal to play a game.</p>
        )}
      </div>
    </ProgressWrapper>
  );
};

export default Progress;

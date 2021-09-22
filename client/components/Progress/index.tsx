import React from 'react';
import Button from '../Button';
import { ProgressWrapper } from './Progress.styles';

interface Props {
  progress: ProgressResponse;
}

const Progress: React.FC<Props> = ({ progress }) => {
  console.log(progress);
  const dailyPhraseGoalNotCompleted =
    progress.data.phrase.added < progress.data.phrase.goal;

  return (
    <ProgressWrapper>
      <div>
        <p className="small">Phrase goal</p>
        <p className="bold">
          {progress.data.phrase.added} / {progress.data.phrase.goal} added
        </p>
        <Button to="/phrase">Add a phrase</Button>
      </div>
      <div>
        <p className="small">Game goal</p>
        <p className="bold">
          {progress.data.games.finished} / {progress.data.games.goal} played
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

import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Block, Card } from '../../styles/Layout.styles';
import Button from '../Button';
import { ProgressWrapper } from './styles';

interface Props {
  progress: ProgressResponse;
}

const Progress: React.FC<Props> = ({ progress }) => {
  const { phrase, games, streak } = progress.data;
  const dailyPhraseGoalNotCompleted = phrase.added < phrase.goal;

  return (
    <ProgressWrapper>
      {streak > 0 && (
        <div className="complete">
          <p className="mid">Current daily goal streak</p>
          <p className="xxlarge bold margin-b">
            {streak} day{streak !== 1 && 's'}, keep it up!
          </p>
        </div>
      )}
      <Block columns="1fr 1fr">
        <Card className={phrase.added >= phrase.goal ? 'complete' : ''}>
          <p className="mid">Phrase goal</p>
          <p className="xxlarge bold margin-b">
            {phrase.added >= phrase.goal && <FiCheckCircle />}
            {phrase.added} / {phrase.goal} added
          </p>
          <Button to="/phrase">Teach your parrot a phrase</Button>
        </Card>
        <Card className={games.finished >= games.goal ? 'complete' : ''}>
          <p className="mid">Game goal</p>
          <p className="xxlarge bold margin-b">
            {games.finished >= games.goal && <FiCheckCircle />}
            {games.finished} / {games.goal} played
          </p>
          <Button to="/play" disabled={dailyPhraseGoalNotCompleted}>
            Create a game from phrases
          </Button>
          {dailyPhraseGoalNotCompleted && (
            <p className="error small">
              Reach your daily phrase goal to play a game.
            </p>
          )}
        </Card>
      </Block>
    </ProgressWrapper>
  );
};

export default Progress;

import React from 'react';
import { FiCheckCircle, FiCircle, FiXCircle } from 'react-icons/fi';
import { GameTrackWrapper, Marker } from './styles';

interface Props {
  progress: ProgressPhrase[];
  progressIndex: number;
}

const GameTrack: React.FC<Props> = ({ progress, progressIndex }) => {
  const renderIcon = (correct: boolean, attempted: boolean) => {
    if (correct) {
      return <FiCheckCircle />;
    }
    if (attempted) {
      return <FiXCircle />;
    }

    return <FiCircle />;
  };
  return (
    <GameTrackWrapper>
      {progress.map((p, index) => (
        <Marker
          key={p._id}
          correct={p.correct}
          error={!p.correct && p.attempted}
          current={index === progressIndex}
        >
          {renderIcon(p.correct, p.attempted)}
        </Marker>
      ))}
    </GameTrackWrapper>
  );
};

export default GameTrack;

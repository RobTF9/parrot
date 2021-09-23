import { useEffect, useState } from 'react';

interface UseGameProgress {
  (
    update: (updatedGame: GameResource) => void,
    game?: { data: GameResource }
  ): [
    progressIndex: number,
    phraseCorrect: (lang: string) => void,
    phraseIncorrect: (lang: string) => void,
    progress?: ProgressPhrase[]
  ];
}

const useGameProgress: UseGameProgress = (update, game) => {
  const [progress, setProgress] = useState<undefined | ProgressPhrase[]>();

  useEffect(() => {
    if (game && !progress) {
      setProgress(
        game.data.phrases.map((phrase) => ({
          ...phrase,
          attempted: false,
          correct: false,
        }))
      );
    }
  }, [game]);

  const [progressIndex, setProgressIndex] = useState(0);

  useEffect(() => {
    if (progress) {
      progress.forEach((phrase) => {
        if (phrase.attempted) {
          setProgressIndex(progressIndex + 1);
        }
      });
    }
  }, [progress]);

  const phraseCorrect = (lang: string): void => {
    if (progress) {
      const newArray = [...progress];
      const indexToChange = newArray.findIndex(
        (phrase) => phrase.lang === lang
      );

      newArray[indexToChange] = {
        ...newArray[indexToChange],
        correct: true,
        attempted: true,
      };

      setProgress(newArray);
    }
  };

  const phraseIncorrect = (lang: string): void => {
    if (progress) {
      const newArray = [...progress];
      const indexToChange = newArray.findIndex(
        (phrase) => phrase.lang === lang
      );

      newArray[indexToChange] = {
        ...newArray[indexToChange],
        attempted: true,
      };

      setProgress(newArray);
    }
  };

  const finishGame = () => {
    if (game && progress) {
      update({
        ...game.data,
        results: [
          ...game.data.results,
          {
            correct: [
              ...progress
                .filter(({ correct }) => correct)
                .map(({ _id }) => _id),
            ],
            attempted: [
              ...progress
                .filter(({ attempted }) => attempted)
                .map(({ _id }) => _id),
            ],
            createdAt: `${Date.now()}`,
            played: true,
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (progress) {
      if (progressIndex === progress.length) {
        finishGame();
      }
    }
  }, [progressIndex]);

  return [progressIndex, phraseCorrect, phraseIncorrect, progress];
};

export default useGameProgress;

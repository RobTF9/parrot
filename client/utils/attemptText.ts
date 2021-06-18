const attemptText = (
  correct: boolean,
  skipped: boolean,
  attempts: number
): string => {
  if (correct) {
    return `Completed in ${attempts} tr${attempts === 1 ? 'y' : 'ies'}`;
  }
  if (skipped) {
    return `Skipped after ${attempts} tr${attempts === 1 ? 'y' : 'ies'}`;
  }
  return `You've made ${attempts} tr${attempts === 1 ? 'y' : 'ies'}`;
};

export default attemptText;

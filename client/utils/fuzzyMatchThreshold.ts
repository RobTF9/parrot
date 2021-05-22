function fuzzyMatchingThreshold(word: string): number {
  if (word.length <= 2) {
    return 0.2;
  }
  if (word.length <= 4) {
    return 0.4;
  }
  if (word.length <= 6) {
    return 0.6;
  }
  return 0.8;
}

export default fuzzyMatchingThreshold;

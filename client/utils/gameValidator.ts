function validateGame(
  game: GameSubmission
): { name?: string; mode?: string; order?: string; items?: string } {
  let errors = {};

  const { name, mode, order, items } = game;

  if (name.trim() === '') {
    errors = { ...errors, name: 'Cannot be empty' };
  }

  if (mode.trim() === '') {
    errors = { ...errors, mode: 'Cannot be empty' };
  }

  if (order.trim() === '') {
    errors = { ...errors, mode: 'Cannot be empty' };
  }

  if (items.length === 0) {
    errors = { ...errors, items: 'A game needs at least one word or sentence' };
  }

  return errors;
}

export default validateGame;

function validateItem(
  word: ItemSubmission
): { lang?: string; pron?: string; tran?: string } {
  let errors = {};

  const { lang, pron, tran } = word;

  if (lang.trim() === '') {
    errors = { ...errors, lang: 'Cannot be empty' };
  }

  if (pron.trim() === '') {
    errors = { ...errors, pron: 'Cannot be empty' };
  }

  if (tran.trim() === '') {
    errors = { ...errors, tran: 'Cannot be empty' };
  }

  return errors;
}

export default validateItem;

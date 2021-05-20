import { useState } from 'react';
import validateWord from '../../utils/wordValidator';

declare global {
  interface WordFormSubmitHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
  }

  interface WordFormChangeHandler {
    (event: React.ChangeEvent<HTMLInputElement>): void;
  }

  interface WordFormTagChangeHandler {
    (event: React.ChangeEvent<HTMLInputElement>): void;
  }

  interface WordFormChangeArray {
    (event: React.ChangeEvent<HTMLInputElement>): void;
  }

  interface WordFormErrors {
    lang?: string;
    pron?: string;
    tran?: string;
  }
}

export function useWordForm(
  mutate: (word: WordSubmission) => void,
  w: WordSubmission
): {
  word: WordSubmission;
  errors: WordFormErrors;
  submitHandler: WordFormSubmitHandler;
  changeHandler: WordFormChangeHandler;
  tagChangeHandler: WordFormTagChangeHandler;
} {
  const [errors, setErrors] = useState({});
  const [word, setWord] = useState<WordSubmission>(w);

  const changeHandler: WordFormChangeHandler = (event) => {
    setErrors({});
    setWord({
      ...word,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler: WordFormSubmitHandler = (event) => {
    event.preventDefault();
    const errs = validateWord(word);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
    } else {
      mutate(word);
    }
  };

  const tagChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setWord({ ...word, tags: [...word.tags, event.target.value] });
    } else {
      setWord({
        ...word,
        tags: word.tags.filter((t) => t !== event.target.value),
      });
    }
  };

  return { word, errors, changeHandler, submitHandler, tagChangeHandler };
}

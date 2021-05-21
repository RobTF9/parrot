import { useState } from 'react';
import validateWord from '../../utils/wordValidator';

declare global {
  interface SentenceFormSubmitHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
  }

  interface SentenceFormChangeHandler {
    (event: React.ChangeEvent<HTMLInputElement>): void;
  }

  interface SentenceFormTagChangeHandler {
    (event: React.ChangeEvent<HTMLInputElement>): void;
  }
  interface SentenceFormErrors {
    lang?: string;
    pron?: string;
    tran?: string;
  }
}

interface UseSentenceForm {
  (mutate: (sentence: SentenceSubmission) => void, s: SentenceSubmission): {
    sentence: SentenceSubmission;
    errors: SentenceFormErrors;
    submitHandler: SentenceFormSubmitHandler;
    changeHandler: SentenceFormChangeHandler;
    tagChangeHandler: SentenceFormTagChangeHandler;
  };
}

export const useSentenceForm: UseSentenceForm = (mutate, s) => {
  const [errors, setErrors] = useState({});
  const [sentence, setSentence] = useState<SentenceSubmission>(s);

  const changeHandler: SentenceFormChangeHandler = (event) => {
    setErrors({});
    setSentence({
      ...sentence,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler: SentenceFormSubmitHandler = (event) => {
    event.preventDefault();
    const errs = validateWord(sentence);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
    } else {
      mutate(sentence);
    }
  };

  const tagChangeHandler: SentenceFormTagChangeHandler = (event) => {
    if (event.target.checked) {
      setSentence({
        ...sentence,
        tags: [...sentence.tags, event.target.value],
      });
    } else {
      setSentence({
        ...sentence,
        tags: sentence.tags.filter((t) => t !== event.target.value),
      });
    }
  };

  return { sentence, errors, changeHandler, submitHandler, tagChangeHandler };
};

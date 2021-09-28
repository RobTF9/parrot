import React, { useState } from 'react';
import validatePhrase from '../../utils/phraseValidator';
import Button from '../Button';
import Input from '../Input';
import { PhraseFormWrapper, Actions } from './styles';

interface Props {
  phrase: PhraseSubmission;
  setPhrase: (phrase: PhraseSubmission) => void;
  mutate: (phrase: PhraseSubmission) => void;
  loading: boolean;
  language: string;
  reset?: () => void;
}

interface PhraseFormErrors {
  lang?: string;
  pron?: string;
  tran?: string;
}

const PhraseForm: React.FC<Props> = ({
  phrase,
  setPhrase,
  mutate,
  loading,
  language,
  reset,
}) => {
  const [errors, setErrors] = useState<PhraseFormErrors>({});

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPhrase({ ...phrase, [event.target.name]: event.target.value });
    setErrors({});
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const validatorErrors = validatePhrase(phrase);
    if (Object.keys(validatorErrors).length > 0) {
      setErrors(validatorErrors);
    } else {
      mutate(phrase);
    }
  };

  return (
    <PhraseFormWrapper onSubmit={onSubmit}>
      <Input
        {...{
          label: language,
          name: 'lang',
          value: phrase.lang,
          onChange,
          error: errors.lang,
        }}
      />
      <Input
        {...{
          label: 'English',
          name: 'tran',
          value: phrase.tran,
          onChange,
          error: errors.tran,
        }}
      />
      <Input
        {...{
          label: 'Pronounciation',
          name: 'pron',
          value: phrase.pron,
          onChange,
          error: errors.pron,
        }}
      />
      <Actions>
        {reset && (
          <button type="button" onClick={() => reset()}>
            Start again
          </button>
        )}
        <Button type="submit" loading={loading}>
          Save phrase
        </Button>
      </Actions>
    </PhraseFormWrapper>
  );
};

export default PhraseForm;

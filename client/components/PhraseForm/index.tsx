import React, { useState } from 'react';
import validateItem from '../../utils/itemValidator';
import Button from '../Button';
import Input from '../Input';
import { PhraseFormWrapper, Actions } from './PhraseForm.styles';

interface Props {
  phrase: ItemSubmission;
  setPhrase: (phrase: ItemSubmission) => void;
  mutate: (item: ItemSubmission) => void;
  loading: boolean;
  language: string;
  reset: () => void;
}

interface ItemFormErrors {
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
  const [errors, setErrors] = useState<ItemFormErrors>({});

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPhrase({ ...phrase, [event.target.name]: event.target.value });
    setErrors({});
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const validatorErrors = validateItem(phrase);
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
        <button type="button" onClick={() => reset()}>
          Start again
        </button>
        <Button type="submit" loading={loading}>
          Save phrase
        </Button>
      </Actions>
    </PhraseFormWrapper>
  );
};

export default PhraseForm;

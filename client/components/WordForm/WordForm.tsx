import React from 'react';
import { UseMutateFunction } from 'react-query';
import { Button } from '../../styles/Buttons.styles';
import Input from '../Input';
import { useWordForm } from './useWordForm';

interface Props {
  initialWord: WordSubmission;
  lexicon: LexiconSession;
  mutate: UseMutateFunction<
    ServerReponse<WordResource>,
    unknown,
    WordSubmission,
    unknown
  >;
}

const WordForm: React.FC<Props> = ({ initialWord, mutate, lexicon }) => {
  const { word, errors, changeHandler, submitHandler } = useWordForm(
    mutate,
    initialWord
  );

  return (
    <form onSubmit={submitHandler}>
      <Input
        {...{
          label: lexicon.language.name,
          value: word.lang,
          name: 'lang',
          onChange: changeHandler,
          error: errors.lang,
        }}
      />
      <Input
        {...{
          label: "How's it pronounced?",
          value: word.pron,
          name: 'pron',
          onChange: changeHandler,
          error: errors.pron,
        }}
      />
      <Input
        {...{
          label: "What's the translation?",
          value: word.tran,
          name: 'tran',
          onChange: changeHandler,
          error: errors.tran,
        }}
      />
      <Button type="submit">Save changes</Button>
    </form>
  );
};

export default WordForm;

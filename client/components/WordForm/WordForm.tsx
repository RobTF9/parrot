import React from 'react';
import { UseMutateFunction } from 'react-query';
import { Button, Tag } from '../../styles/Buttons.styles';
import Input from '../Input';
import { useWordForm } from './useWordForm';
import { TagList } from './WordForm.styles';

interface Props {
  initialWord: WordSubmission;
  lexicon: LexiconSession;
  tags: TagResource[];
  mutate: UseMutateFunction<
    ServerReponse<WordResource>,
    unknown,
    WordSubmission,
    unknown
  >;
}

const WordForm: React.FC<Props> = ({ initialWord, mutate, lexicon, tags }) => {
  const {
    word,
    errors,
    changeHandler,
    submitHandler,
    tagChangeHandler,
  } = useWordForm(mutate, initialWord);

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
      <TagList>
        {tags.map((tag) => (
          <Tag key={tag._id} style={{ backgroundColor: tag.color }}>
            <label htmlFor={tag._id}>
              <input
                type="checkbox"
                id={tag._id}
                value={tag._id}
                defaultChecked={!!word.tags.find((t) => t === tag._id)}
                onChange={tagChangeHandler}
              />
              {tag.tag}
            </label>
          </Tag>
        ))}
      </TagList>
      <Button type="submit">Save changes</Button>
    </form>
  );
};

export default WordForm;

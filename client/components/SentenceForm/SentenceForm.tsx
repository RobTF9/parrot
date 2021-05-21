import React from 'react';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import { UseMutateFunction } from 'react-query';
import { Button, Tag } from '../../styles/Buttons.styles';
import Input from '../Input';
import TagCreator from '../TagCreator';
import { useSentenceForm } from './useSentenceForm';
import { TagList } from './SentenceForm.styles';

interface Props {
  initialSentence: SentenceSubmission;
  lexicon: LexiconSession;
  tags: TagResource[];
  mutate: UseMutateFunction<
    ServerReponse<SentenceResource>,
    unknown,
    SentenceSubmission,
    unknown
  >;
  tagMutate: UseMutateFunction<
    ServerReponse<TagResource>,
    unknown,
    TagSubmission,
    unknown
  >;
}

const SentenceForm: React.FC<Props> = ({
  initialSentence,
  mutate,
  lexicon,
  tags,
  tagMutate,
}) => {
  const {
    sentence,
    errors,
    changeHandler,
    submitHandler,
    tagChangeHandler,
  } = useSentenceForm(mutate, initialSentence);

  return (
    <form onSubmit={submitHandler}>
      <Input
        {...{
          label: lexicon.language.name,
          value: sentence.lang,
          name: 'lang',
          onChange: changeHandler,
          error: errors.lang,
        }}
      />
      <Input
        {...{
          label: "How's it pronounced?",
          value: sentence.pron,
          name: 'pron',
          onChange: changeHandler,
          error: errors.pron,
        }}
      />
      <Input
        {...{
          label: "What's the translation?",
          value: sentence.tran,
          name: 'tran',
          onChange: changeHandler,
          error: errors.tran,
        }}
      />
      <TagCreator {...{ tagMutate }} />
      <TagList className="border-b-s">
        {tags.map((tag) => (
          <Tag
            key={tag._id}
            color={
              sentence.tags.find((t) => t === tag._id) && 'var(--core-dark)'
            }
          >
            <label htmlFor={tag._id}>
              <input
                type="checkbox"
                id={tag._id}
                value={tag._id}
                defaultChecked={!!sentence.tags.find((t) => t === tag._id)}
                onChange={tagChangeHandler}
              />
              {sentence.tags.find((t) => t === tag._id) ? (
                <FiCheckCircle />
              ) : (
                <FiCircle />
              )}
              {tag.tag}
            </label>
          </Tag>
        ))}
      </TagList>
      <Button type="submit">Save changes</Button>
    </form>
  );
};

export default SentenceForm;

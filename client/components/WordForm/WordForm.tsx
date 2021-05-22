import { AnimatePresence, motion } from 'framer-motion';
import React, { createRef } from 'react';
import {
  FiCheckCircle,
  FiCircle,
  FiMic,
  FiMicOff,
  FiPlay,
} from 'react-icons/fi';
import { UseMutateFunction } from 'react-query';
import { Button, Tag } from '../../styles/Buttons.styles';
import { heightExpand } from '../../utils/animations';
import Input from '../Input';
import TagCreator from '../TagCreator';
import useSpeechTest from './useSpeechTest';
import { useWordForm } from './useWordForm';
import { TagList, WordWrapper } from './WordForm.styles';

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
  tagMutate: UseMutateFunction<
    ServerReponse<TagResource>,
    unknown,
    TagSubmission,
    unknown
  >;
}

const WordForm: React.FC<Props> = ({
  initialWord,
  mutate,
  lexicon,
  tags,
  tagMutate,
}) => {
  const audioEl = createRef<HTMLAudioElement>();

  const {
    word,
    errors,
    changeHandler,
    submitHandler,
    tagChangeHandler,
  } = useWordForm(mutate, initialWord);

  const {
    transcript,
    startListening,
    correct,
    listening,
    canListen,
  } = useSpeechTest(word.lang);

  const play = () => {
    if (audioEl.current) {
      audioEl.current.play();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <WordWrapper>
        <Input
          {...{
            label: lexicon.language.name,
            value: word.lang,
            name: 'lang',
            onChange: changeHandler,
            error: errors.lang,
          }}
        />
        <Button disabled={!canListen} type="button" onClick={startListening}>
          {canListen ? <FiMic /> : <FiMicOff />}
        </Button>
        <Button type="button" onClick={play}>
          <FiPlay />
        </Button>
        <audio
          ref={audioEl}
          src={`https://translate.google.com/translate_tts?ie=UTF-8&tl=${lexicon.language.langCode}&client=tw-ob&q=${word.lang}`}
        />
      </WordWrapper>
      <AnimatePresence>
        {(listening || correct) && (
          <motion.div layout {...{ ...heightExpand }}>
            {correct ? 'Correct!' : 'Listening...'} {transcript}
          </motion.div>
        )}
      </AnimatePresence>
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
      <TagCreator {...{ tagMutate }} />
      <TagList className="border-b-s">
        {tags.map((tag) => (
          <Tag
            key={tag._id}
            color={word.tags.find((t) => t === tag._id) && 'var(--core-dark)'}
          >
            <label htmlFor={tag._id}>
              <input
                type="checkbox"
                id={tag._id}
                value={tag._id}
                defaultChecked={!!word.tags.find((t) => t === tag._id)}
                onChange={tagChangeHandler}
              />
              {word.tags.find((t) => t === tag._id) ? (
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

export default WordForm;

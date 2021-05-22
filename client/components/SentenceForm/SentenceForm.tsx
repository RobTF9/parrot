import React, { createRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiCircle,
  FiMic,
  FiMicOff,
  FiPlay,
} from 'react-icons/fi';
import { UseMutateFunction } from 'react-query';
import { Button, Tag } from '../../styles/Buttons.styles';
import Input from '../Input';
import TagCreator from '../TagCreator';
import { useSentenceForm } from './useSentenceForm';
import { TagList, SentenceTest } from './SentenceForm.styles';
import useSpeechTest from '../../hooks/useSpeechTest';
import { heightExpand } from '../../utils/animations';

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
  const audioEl = createRef<HTMLAudioElement>();

  const {
    sentence,
    errors,
    changeHandler,
    submitHandler,
    tagChangeHandler,
  } = useSentenceForm(mutate, initialSentence);

  const {
    transcript,
    startListening,
    correct,
    listening,
    canListen,
  } = useSpeechTest(sentence.lang);

  const play = () => {
    if (audioEl.current) {
      audioEl.current.play();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <SentenceTest>
        <Input
          {...{
            label: lexicon.language.name,
            value: sentence.lang,
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
          src={`https://translate.google.com/translate_tts?ie=UTF-8&tl=${lexicon.language.langCode}&client=tw-ob&q=${sentence.lang}`}
        />
      </SentenceTest>
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

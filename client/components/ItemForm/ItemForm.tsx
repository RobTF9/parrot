import { AnimatePresence, motion } from 'framer-motion';
import React, { createRef } from 'react';
import { Link } from 'react-router-dom';
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
import useSpeechTest from '../../hooks/useSpeechTest';
import { useItemForm } from './useItemForm';
import { TagList, ItemTest } from './ItemForm.styles';
import { Flex } from '../../styles/Layout.styles';

interface Props {
  initialItem: ItemSubmission;
  back: string;
  lexicon: LexiconSession;
  tags: TagResource[];
  mutate: UseMutateFunction<
    ServerReponse<ItemResource>,
    unknown,
    ItemSubmission,
    unknown
  >;
  tagMutate: UseMutateFunction<
    ServerReponse<TagResource>,
    unknown,
    TagSubmission,
    unknown
  >;
}

const ItemForm: React.FC<Props> = ({
  initialItem,
  back,
  mutate,
  lexicon,
  tags,
  tagMutate,
}) => {
  const audioEl = createRef<HTMLAudioElement>();

  const {
    item,
    errors,
    changeHandler,
    submitHandler,
    tagChangeHandler,
  } = useItemForm(mutate, initialItem);

  const {
    transcript,
    startListening,
    correct,
    listening,
    canListen,
  } = useSpeechTest(item.lang);

  const play = () => {
    if (audioEl.current) {
      audioEl.current.play();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <ItemTest>
        <Input
          {...{
            label: lexicon.language.name,
            value: item.lang,
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
          src={`https://translate.google.com/translate_tts?ie=UTF-8&tl=${lexicon.language.langCode}&client=tw-ob&q=${item.lang}`}
        />
      </ItemTest>
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
          value: item.pron,
          name: 'pron',
          onChange: changeHandler,
          error: errors.pron,
        }}
      />
      <Input
        {...{
          label: "What's the translation?",
          value: item.tran,
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
            color={item.tags.find((t) => t === tag._id) && 'var(--core-dark)'}
          >
            <label htmlFor={tag._id}>
              <input
                type="checkbox"
                id={tag._id}
                value={tag._id}
                defaultChecked={!!item.tags.find((t) => t === tag._id)}
                onChange={tagChangeHandler}
              />
              {item.tags.find((t) => t === tag._id) ? (
                <FiCheckCircle />
              ) : (
                <FiCircle />
              )}
              {tag.tag}
            </label>
          </Tag>
        ))}
      </TagList>
      <Flex justify="space-between" noMargin>
        <Link to={back}>Close</Link>
        <Button type="submit">Save changes</Button>
      </Flex>
    </form>
  );
};

export default ItemForm;

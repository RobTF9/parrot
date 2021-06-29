import React, { createRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiMic, FiMicOff, FiPlay } from 'react-icons/fi';
import {
  ItemTestWrapper,
  SpeechTestButton,
  ErrorMessage,
} from './ItemTest.styles';
import useSpeechTest from '../../hooks/useSpeechTest';
import { heightExpand } from '../../utils/animations';
import Input from '../Input';
import { Button } from '../../styles/Buttons.styles';

interface Props {
  item: ItemSubmission;
  lexicon: LexiconSession;
  changeHandler: ItemFormChangeHandler;
  errors: ItemFormErrors;
}

const ItemTest: React.FC<Props> = ({
  item,
  lexicon,
  changeHandler,
  errors,
}) => {
  const audioEl = createRef<HTMLAudioElement>();

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
    <>
      <ItemTestWrapper>
        <Input
          {...{
            label: lexicon.language.name,
            value: item.lang,
            name: 'lang',
            onChange: changeHandler,
            error: errors.lang,
          }}
        />
        <SpeechTestButton
          disabled={!canListen || item.lang.trim() === ''}
          type="button"
          onClick={startListening}
          listening={listening}
          correct={correct}
        >
          {!canListen ? <FiMicOff /> : correct ? <FiCheck /> : <FiMic />}
        </SpeechTestButton>
        <Button disabled={item.lang.trim() === ''} type="button" onClick={play}>
          <FiPlay />
        </Button>
        <audio
          ref={audioEl}
          src={`https://translate.google.com/translate_tts?ie=UTF-8&tl=${lexicon.language.langCode}&client=tw-ob&q=${item.lang}`}
        />
      </ItemTestWrapper>
      {!canListen && (
        <ErrorMessage>
          <p>
            Our voice recognition system isn&apos;t compatible with your
            browser. To use the speech recognition feature use Chrome.
          </p>
        </ErrorMessage>
      )}
      <AnimatePresence>
        {(listening || correct) && (
          <motion.div layout {...{ ...heightExpand }}>
            {correct ? 'Correct!' : 'Listening...'} {transcript}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ItemTest;

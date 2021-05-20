import React from 'react';
import { createTag, getTags } from '../../api/resources/tags';
import { createWord } from '../../api/resources/word';
import AnimatedModal from '../../components/AnimatedModal';
import WordForm from '../../components/WordForm/WordForm';
import { useLexiconContext } from '../../context/Lexicon';
import { useMessageContext } from '../../context/Message';
import { Loading } from '../../styles/Animations.styles';

const CreateWord: React.FC = () => {
  const { showMessage } = useMessageContext();
  const { lexicon } = useLexiconContext();

  const [tags, tagsLoading] = getTags();
  const [tagMutate, tagMutateLoading] = createTag(undefined, (res) => {
    if (res.message) {
      showMessage(res.message);
    }
  });

  const [create, createLoading] = createWord(undefined, (res) => {
    if (res.message) {
      showMessage(res.message);
    }
  });

  const word = {
    lang: '',
    pron: '',
    tran: '',
    tags: [],
  };

  return (
    <AnimatedModal back="/words">
      {(createLoading || tagsLoading || tagMutateLoading) && <Loading bg />}
      <h3 className="bold border-b-s xlarge">Add a new word</h3>
      {lexicon && tags && (
        <WordForm
          {...{
            initialWord: word,
            tags: tags.data,
            lexicon,
            mutate: create,
            tagMutate,
          }}
        />
      )}
    </AnimatedModal>
  );
};

export default CreateWord;

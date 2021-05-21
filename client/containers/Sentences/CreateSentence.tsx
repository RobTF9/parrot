import React from 'react';
import { createTag, getTags } from '../../api/resources/tags';
import { createSentence } from '../../api/resources/sentence';
import AnimatedModal from '../../components/AnimatedModal';
import SentenceForm from '../../components/SentenceForm';
import { useLexiconContext } from '../../context/Lexicon';
import { useMessageContext } from '../../context/Message';
import { Loading } from '../../styles/Animations.styles';

const CreateSentence: React.FC = () => {
  const { showMessage } = useMessageContext();
  const { lexicon } = useLexiconContext();

  const [tags, tagsLoading] = getTags();
  const [tagMutate, tagMutateLoading] = createTag(undefined, (res) => {
    if (res.message) {
      showMessage(res.message);
    }
  });

  const [create, createLoading] = createSentence(undefined, (res) => {
    if (res.message) {
      showMessage(res.message);
    }
  });

  const sentence = {
    lang: '',
    pron: '',
    tran: '',
    tags: [],
  };

  return (
    <AnimatedModal back="/sentences">
      {(createLoading || tagsLoading || tagMutateLoading) && <Loading bg />}
      <h3 className="bold border-b-s xlarge">Add a new sentence</h3>
      {lexicon && tags && (
        <SentenceForm
          {...{
            initialSentence: sentence,
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

export default CreateSentence;

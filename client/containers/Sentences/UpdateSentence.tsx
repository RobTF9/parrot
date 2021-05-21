import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createTag, getTags } from '../../api/resources/tags';
import { updateSentence, getSentence } from '../../api/resources/sentence';
import AnimatedModal from '../../components/AnimatedModal';
import { useLexiconContext } from '../../context/Lexicon';
import { useMessageContext } from '../../context/Message';
import { Loading } from '../../styles/Animations.styles';
import SentenceForm from '../../components/SentenceForm';

const UpdateSentence: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();

  const { showMessage } = useMessageContext();
  const { lexicon } = useLexiconContext();

  const [tags, tagsLoading] = getTags();
  const [tagMutate, tagMutateLoading] = createTag(undefined, (res) => {
    if (res.message) {
      showMessage(res.message);
    }
  });

  const [sentence, sentenceLoading] = getSentence(id);
  const [update, updateLoading] = updateSentence(id, (res) => {
    if (res.message) {
      showMessage(res.message);
      setTimeout(() => {
        push('/sentences');
      }, 2000);
    }
  });

  return (
    <AnimatedModal back="/sentences">
      {(sentenceLoading ||
        updateLoading ||
        tagsLoading ||
        tagMutateLoading) && <Loading bg />}
      <h3 className="bold border-b-s xlarge">Update word</h3>
      {sentence && lexicon && tags && (
        <SentenceForm
          {...{
            initialSentence: sentence.data,
            tags: tags.data,
            lexicon,
            mutate: update,
            tagMutate,
          }}
        />
      )}
    </AnimatedModal>
  );
};

export default UpdateSentence;

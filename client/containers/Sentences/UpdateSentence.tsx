import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createTag, getTags } from '../../api/resources/tags';
import { updateSentence, getSentence } from '../../api/resources/sentence';
import AnimatedModal from '../../components/AnimatedModal';
import { useLexiconContext } from '../../context/Lexicon';
import { Loading } from '../../styles/Animations.styles';
import ItemForm from '../../components/ItemForm';

const UpdateSentence: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();

  const { lexicon } = useLexiconContext();

  const [tags, tagsLoading] = getTags();
  const [tagMutate, tagMutateLoading] = createTag();

  const [sentence, sentenceLoading] = getSentence(id);
  const [update, updateLoading] = updateSentence(id, (res) => {
    if (res.data) {
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
        <ItemForm
          {...{
            back: '/sentences',
            initialItem: sentence.data,
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

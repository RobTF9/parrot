import React from 'react';
import { createTag, getTags } from '../../api/resources/tags';
import { createSentence } from '../../api/resources/sentence';
import AnimatedModal from '../../components/AnimatedModal';
import { useLexiconContext } from '../../context/Lexicon';
import { Loading } from '../../styles/Animations.styles';
import ItemForm from '../../components/ItemForm';

const CreateSentence: React.FC = () => {
  const { lexicon } = useLexiconContext();

  const [tags, tagsLoading] = getTags();
  const [tagMutate, tagMutateLoading] = createTag();

  const [create, createLoading] = createSentence();

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
        <ItemForm
          {...{
            back: '/sentences',
            initialItem: sentence,
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

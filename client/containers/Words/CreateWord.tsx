import React from 'react';
import { createTag, getTags } from '../../api/resources/tags';
import { createWord } from '../../api/resources/word';
import AnimatedModal from '../../components/AnimatedModal';
import ItemForm from '../../components/ItemForm';
import { useLexiconContext } from '../../context/Lexicon';
import { Loading } from '../../styles/Animations.styles';

const CreateWord: React.FC = () => {
  const { lexicon } = useLexiconContext();
  const [tags, tagsLoading] = getTags();
  const [tagMutate, tagMutateLoading] = createTag();
  const [create, createLoading] = createWord();

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
        <ItemForm
          {...{
            back: '/words',
            initialItem: word,
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

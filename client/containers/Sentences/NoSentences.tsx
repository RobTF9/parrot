import React from 'react';
import { createTag, getTags } from '../../api/resources/tags';
import { createSentence } from '../../api/resources/sentence';
import AnimatedModal from '../../components/AnimatedModal';
import { useLexiconContext } from '../../context/Lexicon';
import { Loading } from '../../styles/Animations.styles';
import ItemForm from '../../components/ItemForm';

const NoSentences: React.FC = () => {
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
    <AnimatedModal>
      {(createLoading || tagsLoading || tagMutateLoading) && <Loading bg />}
      <h3 className="bold xlarge">Add your first sentence</h3>
      <p className="border-b-s">
        To add a sentence you&apos;ll need to enter it in{' '}
        {lexicon?.language.name}, a translation to help you pronounce it, and
        the English translation
      </p>
      {lexicon && tags && (
        <ItemForm
          {...{
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

export default NoSentences;

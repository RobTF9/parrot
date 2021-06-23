import React from 'react';
import { createTag, getTags } from '../../api/resources/tags';
import { createWord } from '../../api/resources/word';
import AnimatedModal from '../../components/AnimatedModal';
import ItemForm from '../../components/ItemForm';
import { useLexiconContext } from '../../context/Lexicon';
import { Loading } from '../../styles/Animations.styles';

const NoWords: React.FC = () => {
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
    <AnimatedModal>
      {(createLoading || tagsLoading || tagMutateLoading) && <Loading bg />}
      <h3 className="bold xlarge margin-b">Create your first word</h3>
      <p className="border-b-s">
        To create a word you&apos;ll need to enter it in{' '}
        {lexicon?.language.name}, a translation to help you pronounce it, and
        the English translation
      </p>
      {lexicon && tags && (
        <ItemForm
          {...{
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

export default NoWords;

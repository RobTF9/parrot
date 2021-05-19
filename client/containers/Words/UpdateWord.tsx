import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getWord, updateWord } from '../../api/resources/word';
import AnimatedModal from '../../components/AnimatedModal';
import WordForm from '../../components/WordForm/WordForm';
import { useLexiconContext } from '../../context/Lexicon';
import { useMessageContext } from '../../context/Message';
import { Loading } from '../../styles/Animations.styles';

const UpdateWord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();
  const { showMessage } = useMessageContext();
  const { lexicon } = useLexiconContext();

  const [word, wordLoading] = getWord(id);

  const [update, updateLoading] = updateWord(id, (res) => {
    if (res.message) {
      showMessage(res.message);
      setTimeout(() => {
        push('/words');
      }, 3000);
    }
  });

  return (
    <AnimatedModal back="/words">
      {wordLoading && updateLoading && <Loading bg />}
      <h3 className="bold border-b-s xlarge">Update word</h3>
      {word && lexicon && (
        <WordForm
          {...{ initialWord: word.data, tags: [], lexicon, mutate: update }}
        />
      )}
    </AnimatedModal>
  );
};

export default UpdateWord;

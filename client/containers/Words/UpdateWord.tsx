import React from 'react';
import { useParams } from 'react-router-dom';
import { getWord } from '../../api/resources/word';
import AnimatedModal from '../../components/AnimatedModal';
import { Loading } from '../../styles/Animations.styles';

const UpdateWord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [word, wordLoading] = getWord(id);

  return (
    <AnimatedModal back="/words">
      {wordLoading && <Loading bg />}
      <h3>Update word</h3>
      {word && <p>{word.data.tran}</p>}
    </AnimatedModal>
  );
};

export default UpdateWord;

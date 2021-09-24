import React from 'react';
import { PhraseListWrapper } from './PhraseList.styles';

interface Props {
  phrases: PhraseResource[];
}

const PhraseList: React.FC<Props> = ({ phrases }) => {
  return (
    <PhraseListWrapper>
      {phrases.map((phrase) => (
        <li key={phrase._id}>{phrase.lang}</li>
      ))}
    </PhraseListWrapper>
  );
};

export default PhraseList;

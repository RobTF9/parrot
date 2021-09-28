import React from 'react';
import { Link } from 'react-router-dom';
import { PhraseListWrapper } from './styles';

interface Props {
  phrases: PhraseResource[];
}

const PhraseList: React.FC<Props> = ({ phrases }) => {
  return (
    <PhraseListWrapper>
      {phrases.map((phrase) => (
        <li className="border-t-s margin-b" key={phrase._id}>
          <p className="mid xlarge">{phrase.lang}</p>
          <p className="small margin-b">
            {phrase.pron} / {phrase.tran}
          </p>
          <Link to={`/phrases/${phrase._id}`}>Edit</Link>
        </li>
      ))}
    </PhraseListWrapper>
  );
};

export default PhraseList;

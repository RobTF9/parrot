import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../styles/Layout.styles';
import { PhraseListWrapper } from './styles';

interface Props {
  phrases: PhraseResource[];
  noLinks?: boolean;
}

const PhraseList: React.FC<Props> = ({ phrases, noLinks }) => {
  return (
    <PhraseListWrapper>
      {phrases.map((phrase) => (
        <Card as="li" key={phrase._id}>
          <p className="mid">{phrase.lang}</p>
          <p className="small margin-b">
            {phrase.pron} / {phrase.tran}
          </p>
          {!noLinks && <Link to={`/phrases/${phrase._id}`}>Edit</Link>}
        </Card>
      ))}
    </PhraseListWrapper>
  );
};

export default PhraseList;

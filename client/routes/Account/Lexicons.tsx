import React from 'react';
import { Card } from '../../styles/Layout.styles';
import lexiconResource from './data/lexiconResource';

const Lexicons: React.FC = () => {
  const { lexicons, getLoading } = lexiconResource();
  return (
    <Card>
      <h2 className="large bold border-b-s">Your Lexicons</h2>
      <ul>
        {lexicons.length > 0 ? (
          lexicons.map(({ language, _id }) => (
            <li key={_id}>{language.name}</li>
          ))
        ) : (
          <li>No lexicons</li>
        )}
      </ul>
    </Card>
  );
};

export default Lexicons;

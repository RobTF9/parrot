import React from 'react';
import YourLexicons from './YourLexicons';
import CreateLexicon from './CreateLexicon';
import SharedLexicons from './SharedLexicons';

const Lexicons: React.FC = () => {
  return (
    <>
      <h2 className="bold xxlarge">Lexicons</h2>
      <CreateLexicon />
      <YourLexicons />
      <SharedLexicons />
    </>
  );
};

export default Lexicons;

import React, { useState } from 'react';
import YourLexicons from './YourLexicons';
import CreateLexicon from './CreateLexicon';
import SharedLexicons from './SharedLexicons';
import { Flex } from '../../styles/Layout.styles';
import Tabs from '../../components/Tabs';

const Lexicons: React.FC = () => {
  const [tab, setTab] = useState('Yours');
  return (
    <>
      <Flex as="header">
        <h2 className="bold xxlarge">Lexicons</h2>
      </Flex>
      <Tabs
        {...{
          set: setTab,
          state: tab,
          tabs: [
            {
              setting: 'Yours',
              text: 'Your lexicons',
            },
            {
              setting: 'Shared',
              text: 'Shared with you',
            },
            {
              setting: 'Create',
              text: 'New lexicon',
            },
          ],
        }}
      />
      {tab === 'Yours' && <YourLexicons />}
      {tab === 'Create' && <CreateLexicon />}
      {tab === 'Shared' && <SharedLexicons />}
    </>
  );
};

export default Lexicons;

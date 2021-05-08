import React from 'react';
import { TextButton } from '../../styles/Buttons.styles';
import { TabsWrapper } from './Tabs.styles';

interface Props {
  tabs: { setting: string; text: string }[];
  state: string;
  set: (state: string) => void;
}

const Tabs: React.FC<Props> = ({ tabs, set, state }) => {
  return (
    <TabsWrapper>
      {tabs.map(({ setting, text }) => (
        <li key={text}>
          {state !== setting ? (
            <TextButton onClick={() => set(setting)}>{text}</TextButton>
          ) : (
            <p className="bold">{text}</p>
          )}
        </li>
      ))}
    </TabsWrapper>
  );
};

export default Tabs;

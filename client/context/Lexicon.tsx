import React, { createContext, useContext, useState } from 'react';
import { get } from '../api/fetch';

interface ILexiconContext {
  lexicon?: string;
  activateLexicon: (l: string) => void;
}

const LexiconContext = createContext<ILexiconContext>({
  activateLexicon: () => null,
});

export const useLexiconContext = (): ILexiconContext =>
  useContext(LexiconContext);

export const LexiconProvider: React.FC = ({ children }) => {
  const [lexicon, setLexicon] = useState<string | undefined>();

  const activateLexicon = async (id: string) => {
    const response = await get<{ message: string; lexicon?: string }>(
      `/api/lexicon/${id}`
    );

    if (response.lexicon) {
      setLexicon(response.lexicon);
    } else {
      console.log(response.message);
    }
  };

  return (
    <LexiconContext.Provider value={{ lexicon, activateLexicon }}>
      {children}
    </LexiconContext.Provider>
  );
};

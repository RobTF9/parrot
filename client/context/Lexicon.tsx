import React, { createContext, useContext, useState } from 'react';
import { get } from '../api/fetch';

interface ILexiconContext {
  lexicon?: string;
  activateLexicon: (l: string) => void;
  deactivateLexicon: () => void;
}

const LexiconContext = createContext<ILexiconContext>({
  activateLexicon: () => null,
  deactivateLexicon: () => null,
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

  const deactivateLexicon = () => setLexicon(undefined);

  return (
    <LexiconContext.Provider
      value={{ lexicon, activateLexicon, deactivateLexicon }}
    >
      {children}
    </LexiconContext.Provider>
  );
};

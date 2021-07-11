import React, { createContext, useContext, useState, useEffect } from 'react';
import { get } from '../data/fetch';
import { queryClient } from './Query';

const LexiconContext = createContext<ILexiconContext>({
  activateLexicon: () => null,
  deactivateLexicon: () => null,
});

export const useLexiconContext = (): ILexiconContext =>
  useContext(LexiconContext);

export const LexiconProvider: React.FC = ({ children }) => {
  const [lexicon, setLexicon] = useState<LexiconSession | undefined>();

  const activateLexicon = async (id: string) => {
    const response = await get<ServerReponse>(`/api/lexicon/${id}`);
    if (response.lexicon) {
      setLexicon(response.lexicon);
    }
  };

  const deactivateLexicon = () => setLexicon(undefined);

  useEffect(() => {
    if (lexicon && lexicon.language.htmlCode) {
      const html = document.getElementById('html');
      html?.setAttribute('lang', lexicon.language.htmlCode);
      queryClient.invalidateQueries();
    }
  }, [lexicon]);

  return (
    <LexiconContext.Provider
      value={{
        lexicon,
        activateLexicon,
        deactivateLexicon,
      }}
    >
      {children}
    </LexiconContext.Provider>
  );
};

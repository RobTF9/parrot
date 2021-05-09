import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLexicons, getShared } from '../api/resources/lexicon';
import { get } from '../api/fetch';

const LexiconContext = createContext<ILexiconContext>({
  activateLexicon: () => null,
  deactivateLexicon: () => null,
  noLexicons: true,
});

export const useLexiconContext = (): ILexiconContext =>
  useContext(LexiconContext);

export const LexiconProvider: React.FC = ({ children }) => {
  const [lexicon, setLexicon] = useState<LexiconSession | undefined>();
  const [yourLexicons, yoursLoading] = getLexicons();
  const [sharedLexicons, sharedLoading] = getShared();

  const activateLexicon = async (id: string) => {
    const response = await get<ServerReponse>(`/api/lexicon/${id}`);
    if (response.lexicon) {
      setLexicon(response.lexicon);
    }
  };

  const deactivateLexicon = () => setLexicon(undefined);

  const noLexicons =
    yourLexicons &&
    yourLexicons.data.length === 0 &&
    sharedLexicons &&
    sharedLexicons.data.length === 0 &&
    !yoursLoading &&
    !sharedLoading;

  useEffect(() => {
    if (lexicon && lexicon.language.htmlCode) {
      const html = document.getElementById('html');
      html?.setAttribute('lang', lexicon.language.htmlCode);
    }
  }, [lexicon]);

  return (
    <LexiconContext.Provider
      value={{
        lexicon,
        activateLexicon,
        deactivateLexicon,
        yourLexicons,
        sharedLexicons,
        yoursLoading,
        sharedLoading,
        noLexicons,
      }}
    >
      {children}
    </LexiconContext.Provider>
  );
};

import React, { createContext, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getLexicons, getShared } from '../api/resources/lexicon';
import { get } from '../api/fetch';

const LexiconContext = createContext<ILexiconContext>({
  activateLexicon: () => null,
  deactivateLexicon: () => null,
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

  if (
    yourLexicons &&
    yourLexicons.data.length === 0 &&
    sharedLexicons &&
    sharedLexicons.data.length === 0 &&
    !yoursLoading &&
    !sharedLoading
  ) {
    return <Redirect to="/no-lexicon" />;
  }

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
      }}
    >
      {children}
    </LexiconContext.Provider>
  );
};

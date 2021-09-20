import React, { createContext, useContext, useState, useEffect } from 'react';
import { get } from '../data/fetch';
import { queryClient } from './Query';

const ParrotContext = createContext<IParrotContext>({
  activateParrot: () => null,
  deactivateParrot: () => null,
});

export const useParrotContext = (): IParrotContext => useContext(ParrotContext);

export const ParrotProvider: React.FC = ({ children }) => {
  const [parrot, setParrot] = useState<ParrotSession | undefined>();

  const activateParrot = async (id: string) => {
    const response = await get<ServerReponse>(`/api/parrot/${id}`);
    if (response.parrot) {
      setParrot(response.parrot);
    }
  };

  const deactivateParrot = () => setParrot(undefined);

  useEffect(() => {
    if (parrot && parrot.language.htmlCode) {
      const html = document.getElementById('html');
      html?.setAttribute('lang', parrot.language.htmlCode);
      queryClient.invalidateQueries();
    }
  }, [parrot]);

  return (
    <ParrotContext.Provider
      value={{
        parrot,
        activateParrot,
        deactivateParrot,
      }}
    >
      {children}
    </ParrotContext.Provider>
  );
};

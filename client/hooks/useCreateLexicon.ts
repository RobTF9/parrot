import { useState } from 'react';
import { createLexicon } from '../api/resources/lexicon';
import { LANGUAGES } from '../utils/constants';

function useCreateLexicon(
  callback?: (res: ServerReponse<LexiconResource>) => void
): {
  createLoading: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  LANGUAGES: {
    name: string;
    htmlCode: string;
    langCode: string;
  }[];
} {
  const [createOne, createLoading] = createLexicon(undefined, callback);
  const [lang, setLang] = useState<LexiconSubmission>({
    language: LANGUAGES[0],
  });

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const foundLanguage = LANGUAGES.find(
      ({ name }) => event.target.value === name
    );
    if (foundLanguage) {
      setLang({ language: foundLanguage });
    }
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      lang &&
      lang.language.name &&
      lang.language.htmlCode &&
      lang.language.langCode
    ) {
      createOne(lang);
    }
  };

  return { createLoading, onChange, onSubmit, LANGUAGES };
}

export default useCreateLexicon;

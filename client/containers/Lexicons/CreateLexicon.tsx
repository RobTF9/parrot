import React from 'react';
import { Loading } from '../../styles/Animations.styles';
import Select from '../../components/Select';
import useCreateLexicon from '../../hooks/useCreateLexicon';
import { useMessageContext } from '../../context/Message';
import { Button } from '../../styles/Buttons.styles';

const CreateLexicon: React.FC = () => {
  const { updateMessage } = useMessageContext();

  const { createLoading, onChange, onSubmit, LANGUAGES } = useCreateLexicon(
    (res: ServerReponse<LexiconResource>) => {
      if (res.message) updateMessage(res.message);
    }
  );

  return (
    <form onSubmit={onSubmit}>
      {createLoading && <Loading bg />}
      <h2 className="large bold border-b-s">Create a new Lexicon</h2>
      <Select
        {...{
          options: LANGUAGES.map(({ name }) => ({
            value: name,
            copy: name,
          })),
          name: 'lang',
          defaultValue: 'Bengali',
          label: 'Pick a language',
          onChange,
        }}
      />
      <Button type="submit">Create lexicon</Button>
    </form>
  );
};

export default CreateLexicon;

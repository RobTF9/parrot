import React from 'react';
import { useHistory } from 'react-router-dom';
import Select from '../../components/Select';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container, Modal } from '../../styles/Layout.styles';
import useCreateLexicon from '../../hooks/useCreateLexicon';
import { useMessageContext } from '../../context/Message';

const CreateLexicon: React.FC = () => {
  const { push } = useHistory();
  const { updateMessage } = useMessageContext();

  const { createLoading, onChange, onSubmit, LANGUAGES } = useCreateLexicon(
    (res: ServerReponse<LexiconResource>) => {
      if (res.message) {
        updateMessage(res.message);
        setTimeout(() => {
          push('/');
        }, 2000);
      }
    }
  );

  return (
    <Container half>
      <h1 className="xlarge center lightest buffer">
        Welcome to <span className="bold">Parrot</span>
      </h1>
      <Modal as="form" onSubmit={onSubmit}>
        {createLoading && <Loading bg />}
        <h2 className="xxlarge bold border-b-s">
          Create a lexicon to get started
        </h2>
        <p className="margin-b">
          Lexicons are collections of words, sentences and games. You can keep
          them to yourself or share them with others
        </p>
        <Select
          {...{
            options: LANGUAGES.map(({ name }) => ({
              value: name,
              copy: name,
            })),
            name: 'lang',
            defaultValue: LANGUAGES[0].name,
            label: 'Pick a language',
            onChange,
          }}
        />
        <Button type="submit">Create lexicon</Button>
      </Modal>
    </Container>
  );
};

export default CreateLexicon;

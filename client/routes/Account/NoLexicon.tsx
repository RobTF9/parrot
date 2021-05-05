import React, { useState } from 'react';
import Select from '../../components/Select';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container, Modal } from '../../styles/Layout.styles';
import { LANGUAGES } from '../../utils/constants';
import lexiconResource from './data/lexiconResource';

const CreateLexicon: React.FC = () => {
  const { createOne, createLoading } = lexiconResource();

  const [lang, setLang] = useState<
    { name: string; htmlCode: string; langCode: string } | undefined
  >();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(LANGUAGES.find(({ name }) => event.target.value === name));
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (lang && lang.name && lang.htmlCode && lang.langCode) {
      createOne({ language: { ...lang } });
    }
  };

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
        <p className="">
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
            defaultValue: '',
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

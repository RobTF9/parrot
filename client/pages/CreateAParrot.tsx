import React, { useState } from 'react';
import { Bottom, Main, Middle, Top } from '../styles/Layout.styles';
import { getLexicons, createLexicon } from '../data/lexiconResource';
import Parrot from '../components/Parrot';
import Input from '../components/Input';
import Button from '../components/Button';
import { useLexiconContext } from '../context/Lexicon';
import { TouchableOpacity } from '../styles/Interactive.styles';
import { LANGUAGES } from '../utils/constants';

const CreateAParrot: React.FC = () => {
  const { activateLexicon } = useLexiconContext();
  const [lexicons] = getLexicons();
  const [create, createLoading] = createLexicon(undefined, (res) => {
    if (res.data) {
      activateLexicon(res.data._id);
    }
  });

  const [newLexicon, setNewLexicon] = useState<LexiconSubmission>({
    language: undefined,
    goals: { words: 10, games: 1 },
  });

  const setLexiconLanguage = (language: Language) =>
    setNewLexicon({ ...newLexicon, language });

  const changeGoals: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewLexicon({
      ...newLexicon,
      goals: { ...newLexicon.goals, [event.target.name]: event.target.value },
    });
  };

  const onSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    create(newLexicon);
  };

  return (
    <Main as="form" onSubmit={onSubmit}>
      <Top>
        <h1 className="xlarge bold">Create a parrot</h1>
        {!newLexicon.language && (
          <p className="margin-t">
            What language do you want to teach your parrot? (You can create
            another one later)
          </p>
        )}
      </Top>
      {!newLexicon.language ? (
        lexicons && (
          <Middle columns="1fr 1fr">
            {LANGUAGES.map((language) => {
              if (
                !lexicons.data.find((l) => l.language.name === language.name)
              ) {
                return (
                  <TouchableOpacity
                    key={language.name}
                    type="button"
                    onClick={() => setLexiconLanguage(language)}
                  >
                    <Parrot language={language.name} />
                    <p className="medium">{language.name}</p>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </Middle>
        )
      ) : (
        <>
          <Middle>
            <Parrot language={newLexicon.language.name} />
            <p className="margin-b-l">
              How many phrases are you aiming to teach your parrot everyday?
            </p>
            <Input
              {...{
                label: 'Phrase goal',
                name: 'words',
                type: 'number',
                value: newLexicon.goals.words,
                onChange: changeGoals,
              }}
            />
            <p className="margin-b-l">
              How many games do you want play with your parrot everyday?
            </p>
            <Input
              {...{
                label: 'Game goal',
                name: 'games',
                type: 'number',
                value: newLexicon.goals.games,
                onChange: changeGoals,
              }}
            />
          </Middle>
          <Bottom>
            <Button type="submit" loading={createLoading}>
              Submit daily goals
            </Button>
          </Bottom>
        </>
      )}
    </Main>
  );
};

export default CreateAParrot;
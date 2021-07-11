import React, { useState } from 'react';
import { Bottom, Main, Middle, Top } from '../styles/Layout.styles';
import { getLexicons } from '../data/lexiconResource';
import ParrotSelect from '../components/ParrotSelect';
import Parrot from '../components/Parrot';
import Input from '../components/Input';
import Button from '../components/Button';

const PickAParrot: React.FC = () => {
  const [lexicons, lexiconsLoading] = getLexicons();

  const [newLexicon, setNewLexicon] = useState<{
    language: LexiconSubmission | undefined;
    goals: { words: number; games: number };
  }>({
    language: undefined,
    goals: { words: 10, games: 1 },
  });

  const setLexiconLanguage = (language: LexiconSubmission) =>
    setNewLexicon({ ...newLexicon, language });

  const changeGoals: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewLexicon({
      ...newLexicon,
      goals: { ...newLexicon.goals, [event.target.name]: event.target.value },
    });
  };

  return (
    <Main as="form">
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
          <ParrotSelect {...{ lexicons: lexicons.data, setLexiconLanguage }} />
        )
      ) : (
        <>
          <Middle>
            <Parrot language={newLexicon.language.language.name} />
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
            <Button type="submit">Submit daily goals</Button>
          </Bottom>
        </>
      )}
    </Main>
  );
};

export default PickAParrot;

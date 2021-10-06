import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Footer, Main, Header, StretchBlock } from '../styles/Layout.styles';
import { getParrots, createParrot } from '../data/parrotResource';
import Parrot from '../components/Parrot';
import Input from '../components/Input';
import Button from '../components/Button';
import { useParrotContext } from '../context/Parrot';
import { TouchableOpacity } from '../styles/Interactive.styles';
import { LANGUAGES } from '../utils/constants';

const CreateAParrot: React.FC = () => {
  const { push } = useHistory();
  const { activateParrot } = useParrotContext();
  const [parrots] = getParrots();
  const [create, createLoading] = createParrot(undefined, (res) => {
    if (res.data) {
      activateParrot(res.data._id);
      setTimeout(() => push('/'), 3000);
    }
  });

  const [newParrot, setNewParrot] = useState<ParrotSubmission>({
    language: undefined,
    goals: { phrase: 10, games: 1 },
  });

  const setParrotLanguage = (language: Language) =>
    setNewParrot({ ...newParrot, language });

  const changeGoals: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewParrot({
      ...newParrot,
      goals: { ...newParrot.goals, [event.target.name]: event.target.value },
    });
  };

  const onSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    create(newParrot);
  };

  return (
    <Main as="form" onSubmit={onSubmit}>
      <Header>
        <h1 className="xlarge bold">Create a parrot</h1>
        {!newParrot.language && (
          <p className="margin-t">
            What language do you want to teach your parrot? (You can create
            another one later)
          </p>
        )}
      </Header>
      {!newParrot.language ? (
        parrots && (
          <StretchBlock columns="1fr 1fr">
            {LANGUAGES.map((language) => {
              if (
                !parrots.data.find((l) => l.language.name === language.name)
              ) {
                return (
                  <TouchableOpacity
                    key={language.name}
                    type="button"
                    onClick={() => setParrotLanguage(language)}
                  >
                    <Parrot language={language.name} />
                    <p className="mid">{language.name}</p>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </StretchBlock>
        )
      ) : (
        <>
          <StretchBlock>
            <Parrot language={newParrot.language.name} />
            <p className="margin-b-l">
              How many phrases are you aiming to teach your parrot everyday?
            </p>
            <Input
              {...{
                label: 'Phrase goal',
                name: 'phrase',
                type: 'number',
                value: newParrot.goals.phrase,
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
                value: newParrot.goals.games,
                onChange: changeGoals,
              }}
            />
          </StretchBlock>
          <Footer>
            <Button type="submit" loading={createLoading}>
              Submit daily goals
            </Button>
          </Footer>
        </>
      )}
    </Main>
  );
};

export default CreateAParrot;

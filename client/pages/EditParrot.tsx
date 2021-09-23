import React, { useEffect, useState } from 'react';
import { Header, Main, StretchBlock, Footer } from '../styles/Layout.styles';
import Button from '../components/Button';
import Input from '../components/Input';
import Parrot from '../components/Parrot';
import { useParrotContext } from '../context/Parrot';
import { getActiveParrot, updateParrot } from '../data/parrotResource';
import Loading from '../components/Loading';

const EditParrot: React.FC = () => {
  const { parrot } = useParrotContext();
  const [parrotData, isLoading] = getActiveParrot();
  const [update, updateLoading] = updateParrot(parrot?._id);

  const [updatedParrot, setUpdateParrot] = useState<ParrotSubmission>();

  useEffect(() => {
    if (parrotData && !updatedParrot) {
      console.log(parrotData);
      setUpdateParrot({ ...parrotData.data });
    }
  }, [parrotData]);

  const changeGoals: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event);
    if (updatedParrot) {
      console.log(event);
      setUpdateParrot({
        ...updatedParrot,
        goals: {
          ...updatedParrot.goals,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  const onSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (updatedParrot) {
      update(updatedParrot);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Main as="form" onSubmit={onSubmit}>
      {parrot && (
        <>
          <Header columns="1fr 150px">
            <h1 className="bold xlarge">
              Edit your {parrot.language.name} parrot goals
            </h1>
            <Parrot language={parrot.language.name} />
          </Header>
          {updatedParrot && (
            <>
              <StretchBlock>
                <p className="margin-b-l">
                  How many phrases are you aiming to teach your parrot everyday?
                </p>
                <Input
                  {...{
                    label: 'Phrase goal',
                    name: 'phrase',
                    type: 'number',
                    value: updatedParrot.goals.phrase,
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
                    value: updatedParrot.goals.games,
                    onChange: changeGoals,
                  }}
                />
              </StretchBlock>
              <Footer>
                <Button type="submit" loading={updateLoading}>
                  Update goals
                </Button>
              </Footer>
            </>
          )}
        </>
      )}
    </Main>
  );
};

export default EditParrot;

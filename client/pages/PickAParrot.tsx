import React from 'react';
import Parrot from '../components/Parrot';
import { useParrotContext } from '../context/Parrot';
import { getParrots } from '../data/parrotResource';
import { TouchableOpacity } from '../styles/Interactive.styles';
import { Main, Header, Card, Block } from '../styles/Layout.styles';
import Loading from '../components/Loading';

const PickAParrot: React.FC = () => {
  const [parrots, parrotsLoading] = getParrots();
  const { activateParrot, parrot } = useParrotContext();

  return (
    <>
      <Loading condition={parrotsLoading} />
      <Main>
        <Header>
          <h1 className="xlarge bold">Pick which parrot to teach today</h1>
        </Header>
        <Block columns="repeat(auto-fit, minmax(16rem, 1fr))">
          {parrots &&
            parrots.data.map(({ _id, language }) =>
              parrot?._id === _id ? (
                <Card key={_id}>
                  <Parrot {...{ language: language.name }} />
                  <p className="mid center">
                    Teaching: <strong>{language.name}</strong>
                  </p>
                </Card>
              ) : (
                <Card>
                  <TouchableOpacity
                    type="button"
                    key={_id}
                    onClick={() => activateParrot(_id)}
                  >
                    <Parrot {...{ language: language.name }} />
                    <p className="mid">{language.name}</p>
                  </TouchableOpacity>
                </Card>
              )
            )}
        </Block>
      </Main>
    </>
  );
};

export default PickAParrot;

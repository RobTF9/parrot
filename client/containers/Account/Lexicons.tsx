import React from 'react';
import { Redirect } from 'react-router-dom';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Card, Grid } from '../../styles/Layout.styles';
import { getLexicons } from '../../api/resources/lexicon';
import { useLexiconContext } from '../../context/Lexicon';
import Select from '../../components/Select';

import useCreateLexicon from '../../hooks/useCreateLexicon';

const Lexicons: React.FC = () => {
  const { lexicon, activateLexicon } = useLexiconContext();
  const [lexicons, getLoading] = getLexicons();
  const { createLoading, onChange, onSubmit, LANGUAGES } = useCreateLexicon();

  return (
    <Grid>
      <Card as="form" onSubmit={onSubmit}>
        {(getLoading || createLoading) && <Loading bg />}
        <h2 className="large bold border-b-s">Create a new Lexicon</h2>
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
      </Card>
      <Card>
        {getLoading && <Loading bg />}
        <h2 className="large bold border-b-s">Your Lexicons</h2>
        <ul>
          {lexicons && lexicons.data.length > 0
            ? lexicons.data.map(({ language, _id }) => (
                <li key={_id}>
                  {lexicon === _id && 'Active: '}
                  <button type="button" onClick={() => activateLexicon(_id)}>
                    {language.name}
                  </button>
                </li>
              ))
            : !getLoading && <Redirect to="/no-lexicon" />}
        </ul>
      </Card>
    </Grid>
  );
};

export default Lexicons;

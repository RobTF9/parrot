import React from 'react';
import { Redirect } from 'react-router-dom';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Card, Grid } from '../../styles/Layout.styles';
import { getLexicons, getShared } from '../../api/resources/lexicon';
import { useLexiconContext } from '../../context/Lexicon';
import Select from '../../components/Select';
import useCreateLexicon from '../../hooks/useCreateLexicon';
import LexiconList from '../../components/LexiconList';

const Lexicons: React.FC = () => {
  const { lexicon, activateLexicon } = useLexiconContext();
  const [lexicons, getLoading] = getLexicons();
  const [sharedLexicons, sharedLoading] = getShared();
  const { createLoading, onChange, onSubmit, LANGUAGES } = useCreateLexicon();

  if (
    lexicons &&
    lexicons.data.length === 0 &&
    sharedLexicons &&
    sharedLexicons.data.length === 0 &&
    !getLoading &&
    !sharedLoading
  ) {
    return <Redirect to="/no-lexicon" />;
  }

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
            defaultValue: 'Bengali',
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
          {lexicons && (
            <LexiconList
              {...{
                lexicon,
                lexicons,
                activate: activateLexicon,
                emptyMessage: "You haven't created any lexicons",
                share: true,
              }}
            />
          )}
        </ul>
      </Card>
      <Card>
        {sharedLoading && <Loading bg />}
        <h2 className="large bold border-b-s">Lexicons shared with you</h2>
        <ul>
          {sharedLexicons && sharedLexicons.data.length > 0 ? (
            sharedLexicons.data.map(({ language, _id }) => (
              <li key={_id}>
                {lexicon === _id && 'Active: '}
                <button type="button" onClick={() => activateLexicon(_id)}>
                  {language.name}
                </button>
              </li>
            ))
          ) : (
            <p>No one has shared a lexicon with you</p>
          )}
        </ul>
      </Card>
    </Grid>
  );
};

export default Lexicons;

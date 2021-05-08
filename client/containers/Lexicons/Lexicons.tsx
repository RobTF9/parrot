import React from 'react';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { useLexiconContext } from '../../context/Lexicon';
import Select from '../../components/Select';
import useCreateLexicon from '../../hooks/useCreateLexicon';
import LexiconList from '../../components/LexiconList';
import { useMessageContext } from '../../context/Message';

const Lexicons: React.FC = () => {
  const {
    lexicon,
    activateLexicon,
    yourLexicons,
    sharedLexicons,
    yoursLoading,
    sharedLoading,
  } = useLexiconContext();

  const { updateMessage } = useMessageContext();

  const { createLoading, onChange, onSubmit, LANGUAGES } = useCreateLexicon(
    (res: ServerReponse<LexiconResource>) => {
      if (res.message) updateMessage(res.message);
    }
  );

  return (
    <>
      <h2 className="bold xxlarge margin-b">Your lexicons</h2>
      <form onSubmit={onSubmit}>
        {(yoursLoading || createLoading) && <Loading bg />}
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

      {yoursLoading && <Loading bg />}
      <h2 className="large bold border-b-s">Your Lexicons</h2>
      <ul>
        {yourLexicons && (
          <LexiconList
            {...{
              lexicon,
              lexicons: yourLexicons,
              activate: activateLexicon,
              emptyMessage: "You haven't created any lexicons",
              share: true,
            }}
          />
        )}
      </ul>

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
    </>
  );
};

export default Lexicons;

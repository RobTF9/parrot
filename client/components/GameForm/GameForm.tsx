import React from 'react';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import useGameForm from './useGameForm';
import Input from '../Input';
import Select from '../Select';
import { GAME_TYPE, GAME_ORDER } from '../../utils/constants';
import capitalize from '../../utils/capitalize';
import { Button, Tag } from '../../styles/Buttons.styles';

interface Props {
  mutate: (game: GameSubmission) => void;
  initialGame: GameSubmission;
  items: ItemResource[];
}

const GameForm: React.FC<Props> = ({ mutate, initialGame, items }) => {
  const {
    game,
    errors,
    filtered,
    searchChangeHandler,
    search,
    gameChangeHandler,
    addItem,
    removeItem,
    gameSubmitHandler,
  } = useGameForm(mutate, initialGame, items);

  return (
    <form onSubmit={gameSubmitHandler}>
      <Input
        {...{
          name: 'name',
          error: errors.name,
          label: 'Game name',
          value: game.name,
          onChange: gameChangeHandler,
        }}
      />
      <Select
        {...{
          name: 'mode',
          label: 'Pick a game type',
          defaultValue: game.mode,
          options: Object.values(GAME_TYPE).map((type) => ({
            value: type,
            copy: capitalize(type),
          })),
          onChange: gameChangeHandler,
        }}
      />
      {game.mode !== GAME_TYPE.CONVERSATION && (
        <Select
          {...{
            name: 'order',
            label: 'Pick a game type',
            defaultValue: game.order,
            options: Object.values(GAME_ORDER).map((order) => ({
              value: order,
              copy: capitalize(order),
            })),
            onChange: gameChangeHandler,
          }}
        />
      )}
      <ol className="border-b-s">
        <h4 className="large bold margin-b">Words &amp; sentences</h4>
        {game.items.length === 0 ? (
          <em>You haven&apos;t added any words or sentences to this game.</em>
        ) : (
          game.items.map(({ _id }) => {
            const item = items.find((i) => _id === i._id);
            if (item) {
              return (
                <Tag
                  onClick={() => removeItem(item)}
                  as="button"
                  color="var(--core-dark)"
                  key={_id}
                >
                  <FiCheckCircle /> {item.lang} / {item.pron} / {item.tran}
                </Tag>
              );
            }
            return null;
          })
        )}
      </ol>
      <Input
        {...{
          label: 'Search for a word or sentence to add',
          name: 'search',
          value: search,
          onChange: searchChangeHandler,
        }}
      />

      {search.trim() !== '' && (
        <ul>
          {filtered.map((item) => (
            <Tag
              as="button"
              key={item._id}
              type="button"
              onClick={() => addItem(item)}
            >
              <FiCircle /> {item.lang} / {item.pron} / {item.tran}
            </Tag>
          ))}
        </ul>
      )}
      <Button type="submit">Save game</Button>
    </form>
  );
};

export default GameForm;

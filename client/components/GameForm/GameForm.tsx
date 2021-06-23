import React from 'react';
import { FiCircle } from 'react-icons/fi';
import useGameForm from './useGameForm';
import Input from '../Input';
import Select from '../Select';
import { GAME_TYPE, GAME_ORDER } from '../../utils/constants';
import capitalize from '../../utils/capitalize';
import { Button, Tag } from '../../styles/Buttons.styles';
import usePositionReorder from './usePositionReorder';
import Draggable from './Draggable';

interface Props {
  mutate: (game: GameSubmission) => void;
  initialGame: GameSubmission;
  items: ItemResource[];
  url: string;
}

const GameForm: React.FC<Props> = ({ mutate, initialGame, items, url }) => {
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
    reorderItems,
  } = useGameForm(mutate, initialGame, items);

  const [itemOrder, updateItemPosition, updateItemOrder] = usePositionReorder(
    game.items
  );

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
          itemOrder.map((item, index) => {
            return (
              <Draggable
                key={item._id}
                {...{
                  item,
                  itemOrder,
                  updateItemPosition,
                  removeItem,
                  updateItemOrder,
                  index,
                  reorderItems,
                  url,
                }}
              />
            );
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

import { useState, useEffect } from 'react';
import useSearch, { SearchChangeHandler } from '../../hooks/useSearch';
import validateGame from '../../utils/gameValidator';

interface GameFormErrors {
  name?: string;
  mode?: string;
  order?: string;
  items?: string;
}

interface GameFormChangeHandler {
  (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
}

interface GameFormSubmitHandler {
  (event: React.ChangeEvent<HTMLFormElement>): void;
}

interface UseGameForm {
  (
    mutate: (game: GameSubmission) => void,
    init: GameSubmission,
    items: ItemResource[]
  ): {
    game: GameSubmission;
    errors: GameFormErrors;
    gameChangeHandler: GameFormChangeHandler;
    addItem: (item: ItemResource) => void;
    removeItem: (item: ItemResource) => void;
    gameSubmitHandler: GameFormSubmitHandler;
    filtered: ItemResource[];
    search: string;
    searchChangeHandler: SearchChangeHandler;
  };
}

const useGameForm: UseGameForm = (mutate, init, items) => {
  const [game, setGame] = useState<GameSubmission>(init);
  const [errors, setErrors] = useState({});

  const gameChangeHandler: GameFormChangeHandler = (event) =>
    setGame({ ...game, [event.target.name]: event.target.value });

  const addItem = (item: ItemResource) =>
    setGame({ ...game, items: [...game.items, item] });

  const removeItem = (item: ItemResource) =>
    setGame({ ...game, items: game.items.filter((i) => i._id !== item._id) });

  const gameSubmitHandler: GameFormSubmitHandler = (event) => {
    event.preventDefault();
    const errs = validateGame(game);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
    } else {
      mutate(game);
    }
  };

  const [otherItems, setOtherItems] = useState<ItemResource[]>([]);

  useEffect(() => {
    if (items) {
      setOtherItems(
        items.filter((item) => !game.items.some((i) => i._id === item._id))
      );
    }
  }, [game, items]);

  const { filtered, changeHandler: searchChangeHandler, search } = useSearch(
    otherItems,
    []
  );

  return {
    game,
    errors,
    filtered,
    searchChangeHandler,
    search,
    gameChangeHandler,
    addItem,
    removeItem,
    gameSubmitHandler,
  };
};

export default useGameForm;

import { useState } from 'react';
import validateItem from '../../utils/itemValidator';

declare global {
  interface ItemFormSubmitHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
  }

  interface ItemFormChangeHandler {
    (event: React.ChangeEvent<HTMLInputElement>): void;
  }

  interface ItemFormTagChangeHandler {
    (event: React.ChangeEvent<HTMLInputElement>): void;
  }
  interface ItemFormErrors {
    lang?: string;
    pron?: string;
    tran?: string;
  }
}

interface UseItemForm {
  (mutate: (item: ItemSubmission) => void, i: ItemSubmission): {
    item: ItemSubmission;
    errors: ItemFormErrors;
    submitHandler: ItemFormSubmitHandler;
    changeHandler: ItemFormChangeHandler;
    tagChangeHandler: ItemFormTagChangeHandler;
  };
}

export const useItemForm: UseItemForm = (mutate, i) => {
  const [errors, setErrors] = useState({});
  const [item, setItem] = useState<ItemSubmission>(i);

  const changeHandler: ItemFormChangeHandler = (event) => {
    setErrors({});
    setItem({
      ...item,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler: ItemFormSubmitHandler = (event) => {
    event.preventDefault();
    const errs = validateItem(item);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
    } else {
      mutate(item);
    }
  };

  const tagChangeHandler: ItemFormTagChangeHandler = (event) => {
    if (event.target.checked) {
      setItem({ ...item, tags: [...item.tags, event.target.value] });
    } else {
      setItem({
        ...item,
        tags: item.tags.filter((t) => t !== event.target.value),
      });
    }
  };

  return { item, errors, changeHandler, submitHandler, tagChangeHandler };
};

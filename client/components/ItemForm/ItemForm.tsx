import React, { useEffect } from 'react';
import deepEqual from 'deep-equal';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import { UseMutateFunction } from 'react-query';
import { Button, Tag } from '../../styles/Buttons.styles';
import Input from '../Input';
import TagCreator from '../TagCreator';
import { useItemForm } from './useItemForm';
import { TagList } from './ItemForm.styles';
import { Flex } from '../../styles/Layout.styles';
import ItemTest from '../ItemTest';

interface Props {
  initialItem: ItemSubmission;
  back?: string;
  lexicon: LexiconSession;
  tags: TagResource[];
  mutate: UseMutateFunction<
    ServerReponse<ItemResource>,
    unknown,
    ItemSubmission,
    unknown
  >;
  tagMutate: UseMutateFunction<
    ServerReponse<TagResource>,
    unknown,
    TagSubmission,
    unknown
  >;
  showMessage?: (message: Message) => void;
}

const ItemForm: React.FC<Props> = ({
  initialItem,
  back,
  mutate,
  lexicon,
  tags,
  tagMutate,
  showMessage,
}) => {
  const {
    item,
    errors,
    changeHandler,
    submitHandler,
    tagChangeHandler,
  } = useItemForm(mutate, initialItem);

  useEffect(() => {
    if (showMessage && !deepEqual(initialItem, item)) {
      showMessage({
        message: 'You have unsaved changes',
        type: 'warning',
        visible: true,
      });
    }
  }, [item]);

  return (
    <form onSubmit={submitHandler}>
      <ItemTest {...{ lexicon, changeHandler, item, errors }} />
      <Input
        {...{
          label: "How's it pronounced?",
          value: item.pron,
          name: 'pron',
          onChange: changeHandler,
          error: errors.pron,
        }}
      />
      <Input
        {...{
          label: "What's the translation?",
          value: item.tran,
          name: 'tran',
          onChange: changeHandler,
          error: errors.tran,
        }}
      />
      <TagCreator {...{ tagMutate }} />
      <TagList className="border-b-s">
        {tags.map((tag) => (
          <Tag
            key={tag._id}
            color={item.tags.find((t) => t === tag._id) && 'var(--core-dark)'}
          >
            <label htmlFor={tag._id}>
              <input
                type="checkbox"
                id={tag._id}
                value={tag._id}
                defaultChecked={!!item.tags.find((t) => t === tag._id)}
                onChange={tagChangeHandler}
              />
              {item.tags.find((t) => t === tag._id) ? (
                <FiCheckCircle />
              ) : (
                <FiCircle />
              )}
              {tag.tag}
            </label>
          </Tag>
        ))}
      </TagList>
      <Flex justify="space-between" noMargin>
        {back && <Link to={back}>Close</Link>}
        <Button type="submit">Save changes</Button>
      </Flex>
    </form>
  );
};

export default ItemForm;

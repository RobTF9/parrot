import React from 'react';
import { Link } from 'react-router-dom';
import { FiMove, FiTrash } from 'react-icons/fi';
import { DraggableItem } from './GameForm.styles';
import { Button } from '../../styles/Buttons.styles';
import useDragging from './useDragging';
import useMeasurePosition from './useMeasurePosition';

interface Props {
  item: ItemResource;
  removeItem: (i: ItemResource) => void;
  itemOrder: ItemResource[];
  updateItemOrder: (i: number, dragOffset: number) => void;
  updateItemPosition: (
    i: number,
    offset: {
      height: number;
      top: number;
    }
  ) => void;
  index: number;
  reorderItems: (order: ItemResource[]) => void;
  url: string;
}

const Draggable: React.FC<Props> = ({
  item,
  itemOrder,
  updateItemPosition,
  removeItem,
  updateItemOrder,
  index,
  reorderItems,
  url,
}) => {
  const [animation, isDragging] = useDragging(index, updateItemOrder, () => {
    reorderItems(itemOrder);
  });

  const ref = useMeasurePosition((pos) => {
    updateItemPosition(index, pos);
  });

  return (
    <DraggableItem
      {...{
        layout: true,
        ref,
        key: item._id,
        isDragging,
        ...animation,
      }}
    >
      <button type="button">
        <FiMove />
      </button>
      <Link to={`${url}/${item._id}`}>
        {item.lang} / {item.pron} / {item.tran}
      </Link>
      <Button type="button" danger small onClick={() => removeItem(item)}>
        <FiTrash />
      </Button>
    </DraggableItem>
  );
};

export default Draggable;
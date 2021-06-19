import { useState } from 'react';
import { AxisBox2D, BoxDelta } from 'framer-motion';

export interface Animation {
  drag: boolean | 'x' | 'y';
  dragElastic: number;
  animate: { scale: number; zIndex: number };
  dragConstraints: { top: number; bottom: number };
  onDragStart: () => void;
  onDragEnd: () => void;
  onViewportBoxUpdate: (box: AxisBox2D, delta: BoxDelta) => void;
}

const useDragging = (
  index: number,
  updateOrder: (i: number, y: number) => void,
  updateState: () => void
): [Animation, boolean] => {
  const [isDragging, setIsDragging] = useState(false);

  return [
    {
      drag: 'y',
      dragElastic: 1,
      animate: {
        scale: isDragging ? 1.05 : 1,
        zIndex: isDragging ? 100 : 1,
      },
      dragConstraints: { top: 0, bottom: 0 },
      onDragStart: () => {
        setIsDragging(true);
      },
      onDragEnd: () => {
        setIsDragging(false);
        updateState();
      },
      onViewportBoxUpdate: (_, delta) => {
        if (isDragging) {
          updateOrder(index, delta.y.translate);
        }
      },
    },
    isDragging,
  ];
};

export default useDragging;

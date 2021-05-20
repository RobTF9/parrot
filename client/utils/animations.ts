type properties = {
  opacity?: number;
  x?: string;
  y?: string;
};

function presenceAnimation(
  initial: properties,
  animate: properties,
  exit: properties
) {
  return {
    initial,
    animate,
    exit,
    transition: {
      stiffness: 300,
    },
  };
}

export const slideAcross = presenceAnimation(
  {
    opacity: 0,
    x: '100%',
  },
  {
    opacity: 1,
    x: '0%',
  },
  {
    opacity: 0,
    x: '-100%',
  }
);

export const slideUp = presenceAnimation(
  {
    opacity: 0,
    y: '100%',
  },
  {
    opacity: 1,
    y: '0%',
  },
  {
    opacity: 0,
    y: '100%',
  }
);

export const bumpUp = presenceAnimation(
  {
    opacity: 0,
    y: '25%',
  },
  {
    opacity: 1,
    y: '0%',
  },
  {
    opacity: 0,
    y: '25%',
  }
);

export const slideDown = presenceAnimation(
  {
    opacity: 0,
    y: '-200%',
  },
  {
    opacity: 1,
    y: '-0%',
  },
  {
    opacity: 0,
    y: '-200%',
  }
);

export const moveUp = presenceAnimation(
  { y: '20%' },
  { y: '0%' },
  { y: '20%' }
);

export const moveIn = presenceAnimation(
  { x: '100%' },
  { x: '0%' },
  { x: '100%' }
);

export const fade = presenceAnimation(
  { opacity: 0 },
  { opacity: 1 },
  { opacity: 0 }
);

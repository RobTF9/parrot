import React from 'react';
import Parrot from '../client/components/Parrot';

export default {
  title: 'Components/Parrot',
  component: Parrot,
};

export const Standard = () => <Parrot />;

export const Bangla = () => (
  <Parrot speaking lexicon={{ language: { name: 'Bengali' } }} />
);

export const Hindi = () => (
  <Parrot speaking lexicon={{ language: { name: 'Hindi' } }} />
);

export const Korean = () => (
  <Parrot speaking lexicon={{ language: { name: 'Korean' } }} />
);

export const Mandarin = () => (
  <Parrot speaking lexicon={{ language: { name: 'Mandarin' } }} />
);

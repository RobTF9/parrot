import React from 'react';
import Parrot from '../../app/components/Parrot';

export default {
  title: 'App/Components/Parrot',
  component: Parrot,
};

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

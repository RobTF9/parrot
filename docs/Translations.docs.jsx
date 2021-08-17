import React from 'react';
import Translations from '../client/components/Translations';

export default {
  title: 'Components/Translations',
  component: Translations,
};

const translations = [
  ['আমি খেলতেছিলাম', 'I was playing'],
  ['খেলতেছিলাম', 'Playing'],
  ['আমি', 'I'],
];

export const Standard = () => <Translations {...{ translations }} />;

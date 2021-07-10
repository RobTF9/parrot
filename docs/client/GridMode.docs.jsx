import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GridMode from '../../client/components/GridMode';

export default {
  title: 'Client/Components/GridMode',
  component: GridMode,
};

const initialResult = {
  score: {
    correct: [],
    total: 3,
  },
  finished: false,
  _id: '60b1d1d18cebde1a4fb058da',
  game: {
    items: [
      '60185d89a7fba10015c88c15',
      '60185dd6a7fba10015c88c20',
      '601956801036b900154d39ef',
    ],
    results: [
      '60b1cb94928f610ebac92c82',
      '60b1cf28f426bd184a1d73bc',
      '60b1cf45ec7070185f5ee3c8',
      '60b1cf7f81b336187cdd3f45',
      '60b1cfbbd3109a18c0bb258f',
      '60b1d0266c8ec418dac3f724',
      '60b1d03fa4055e18fc2c3262',
      '60b1d0744b179c1937b50734',
      '60b1d0b1fc5a7d19919f1ca3',
      '60b1d0f7ae952e19d9f3b151',
      '60b1d13c70f4661a00685682',
      '60b1d1d18cebde1a4fb058da',
    ],
    _id: '60afc235adee966e78a2692a',
    name: 'Blah',
    mode: 'GRID',
    order: 'MANUAL',
    createdBy: '6016b9410266200015c5e7f9',
    updatedBy: '6016b9410266200015c5e7f9',
    lexicon: '6093e4e3103adf787edeb009',
    createdAt: '2021-05-27T16:00:53.440Z',
    updatedAt: '2021-05-29T05:32:01.457Z',
  },
  lexicon: '6093e4e3103adf787edeb009',
  createdBy: '6016b9410266200015c5e7f9',
  items: [
    {
      attempts: 1,
      correct: true,
      skipped: false,
      _id: '60b1d1d18cebde1a4fb058db',
      item: {
        tags: ['6093e4e3105adf787edeb009'],
        type: 'word',
        _id: '60185d89a7fba10015c88c15',
        lexicon: '6093e4e3103adf787edeb009',
        lang: 'কালো',
        pron: 'Kalo',
        tran: 'Black',
        createdBy: '6016b9410266200015c5e7f9',
        createdAt: '2021-02-01T19:59:05.693Z',
        updatedAt: '2021-02-01T19:59:05.693Z',
        __v: 0,
      },
    },
    {
      attempts: 3,
      correct: false,
      skipped: true,
      _id: '60b1d1d18cebde1a4fb058dc',
      item: {
        tags: ['6093e4e3105adf787edeb009'],
        type: 'word',
        _id: '60185dd6a7fba10015c88c20',
        lexicon: '6093e4e3103adf787edeb009',
        lang: 'মেঘলা',
        pron: 'Meglha',
        tran: 'Cloudy',
        createdBy: '6016b9410266200015c5e7f9',
        createdAt: '2021-02-01T20:00:22.300Z',
        updatedAt: '2021-02-01T20:00:22.300Z',
        __v: 0,
      },
    },
    {
      attempts: 0,
      correct: false,
      skipped: false,
      _id: '60b1d1d18cebde1a4fb058dd',
      item: {
        tags: ['6093e4e3105adf787edeb005'],
        type: 'word',
        _id: '601956801036b900154d39ef',
        lexicon: '6093e4e3103adf787edeb009',
        lang: 'সালামুআলাইকুম',
        pron: 'Salam-walekum',
        tran: 'Hello (Muslim)',
        createdBy: '6016b9410266200015c5e7f9',
        createdAt: '2021-02-02T13:41:20.913Z',
        updatedAt: '2021-02-02T13:41:20.913Z',
        __v: 0,
      },
    },
  ],
  createdAt: '2021-05-29T05:32:01.440Z',
  updatedAt: '2021-06-16T15:53:59.437Z',
  __v: 1,
};

export const Initial = () => (
  <BrowserRouter>
    <GridMode {...{ result: initialResult }} />
  </BrowserRouter>
);

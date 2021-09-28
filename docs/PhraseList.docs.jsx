import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PhraseList from '../client/components/PhraseList';

export default {
  title: 'Components/PhraseList',
  component: PhraseList,
};

export const Standard = () => {
  return (
    <BrowserRouter>
      <PhraseList
        {...{
          phrases: [
            {
              _id: '60185d89a7fba10015c88c15',
              parrot: '6093e4e3103adf787edeb009',
              lang: 'কালো',
              pron: 'Kalo',
              tran: 'Black',
              createdBy: '6016b9410266200015c5e7f9',
              createdAt: '2021-09-28T07:43:39.763Z',
              updatedAt: '2021-09-28T07:43:39.763Z',
            },
            {
              _id: '60185d89a7fba10015c88c16',
              parrot: '6093e4e3103adf787edeb009',
              lang: 'হলুদ',
              pron: 'Holud',
              tran: 'Yellow',
              createdBy: '6016b9410266200015c5e7f9',
              createdAt: '2021-09-28T07:43:39.763Z',
              updatedAt: '2021-09-28T07:43:39.763Z',
            },
            {
              _id: '60185d89a7fba10015c88c17',
              parrot: '6093e4e3103adf787edeb009',
              lang: 'লাল',
              pron: 'Laal',
              tran: 'Red',
              createdBy: '6016b9410266200015c5e7f9',
              createdAt: '2021-09-28T07:43:39.763Z',
              updatedAt: '2021-09-28T07:43:39.763Z',
            },
          ],
        }}
      />
    </BrowserRouter>
  );
};

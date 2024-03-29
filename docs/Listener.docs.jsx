import React from 'react';
import {
  Main,
  StretchBlock,
  Header,
  Footer,
} from '../client/styles/Layout.styles';
import Listener from '../client/components/Listener';

export default {
  title: 'Components/Listener',
  component: Listener,
};

export const Standard = () => (
  <Main>
    <Header>Header</Header>
    <StretchBlock>
      <Listener
        {...{
          phrase: {
            _id: {
              $oid: '60185d89a7fba10015c88c15',
            },
            parrot: {
              $oid: '6093e4e3103adf787edeb009',
            },
            lang: 'কালো',
            pron: 'Kalo',
            tran: 'Black',
            createdBy: {
              $oid: '6016b9410266200015c5e7f9',
            },
            createdAt: {
              $date: '2021-09-22T00:01:00.693Z',
            },
            updatedAt: {
              $date: '2021-09-22T00:01:00.693Z',
            },
            __v: 0,
          },
          phraseCorrect: () => null,
          phraseInorrect: () => null,
        }}
      />
    </StretchBlock>
    <Footer>Footer</Footer>
  </Main>
);

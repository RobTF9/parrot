import React from 'react';
import {
  Header,
  Main,
  UpperBlock,
  StretchBlock,
  LowerBlock,
  Footer,
  Block,
} from '../client/styles/Layout.styles';

export default {
  title: 'Styles/Layout',
  component: Main,
};

export const AllBlocks = () => (
  <Main style={{ background: 'aqua' }}>
    <Header style={{ background: 'red' }}>Header</Header>
    <UpperBlock style={{ background: 'blue' }}>Upper</UpperBlock>
    <UpperBlock style={{ background: 'blue' }}>Upper</UpperBlock>
    <Block>Block</Block>
    <LowerBlock style={{ background: 'blue' }}>Lower</LowerBlock>
    <LowerBlock style={{ background: 'blue' }}>Lower</LowerBlock>
    <Footer style={{ background: 'red' }}>Footer</Footer>
  </Main>
);

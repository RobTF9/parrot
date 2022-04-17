import React from 'react';
import styled from 'styled-components';
import Parrot from '../client/components/Parrot';

export default {
  title: 'Components/Parrot',
  component: Parrot,
};

const Wrapper = styled.div`
  width: 300px;
`;

export const Standard = () => (
  <Wrapper>
    <Parrot />
  </Wrapper>
);

export const Bangla = () => (
  <Wrapper>
    <Parrot speaking language="Bengali" />
  </Wrapper>
);

export const Italian = () => (
  <Wrapper>
    <Parrot speaking language="Italian" />
  </Wrapper>
);

export const Hindi = () => (
  <Wrapper>
    <Parrot speaking language="Hindi" />
  </Wrapper>
);

export const Korean = () => (
  <Wrapper>
    <Parrot speaking language="Korean" />
  </Wrapper>
);

export const Mandarin = () => (
  <Wrapper>
    <Parrot speaking language="Mandarin" />
  </Wrapper>
);

export const German = () => (
  <Wrapper>
    <Parrot speaking language="German" />
  </Wrapper>
);

export const French = () => (
  <Wrapper>
    <Parrot speaking language="French" />
  </Wrapper>
);

export const Spanish = () => (
  <Wrapper>
    <Parrot speaking language="Spanish" />
  </Wrapper>
);

export const Japanese = () => (
  <Wrapper>
    <Parrot speaking language="Japanese" />
  </Wrapper>
);

export const Turkish = () => (
  <Wrapper>
    <Parrot speaking language="Turkish" />
  </Wrapper>
);

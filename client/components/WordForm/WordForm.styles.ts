import styled from 'styled-components';
import { Tag } from '../../styles/Buttons.styles';

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  ${Tag} {
    position: relative;

    label {
      display: flex;
      line-height: 1.2;

      svg {
        margin-right: var(--smaller);
      }
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
`;

export const WordWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  label {
    flex-grow: 1;
    margin: 0;
  }

  button {
    flex-grow: 0;
    margin-bottom: var(--small);
    margin-left: var(--small);
    padding: var(--medium);

    svg {
      stroke: var(--core-white);
      transform: translateY(0.3rem);
    }
  }
`;

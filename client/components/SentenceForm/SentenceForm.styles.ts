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

import styled from 'styled-components';

export const TableWrapper = styled.table`
  min-width: 100%;

  * {
    font-size: var(--small);
  }

  th {
    background-color: var(--core-mid-50);
    text-align: left;
  }

  th,
  td {
    padding: var(--small);
    border: 0.1rem solid var(--core-mid-50);
  }
`;

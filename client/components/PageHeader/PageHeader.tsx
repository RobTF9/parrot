import React from 'react';
import { PageHeaderWrapper } from './PageHeader.styles';

interface Props {
  title: string;
}

const PageHeader: React.FC<Props> = ({ title, children }) => {
  return (
    <PageHeaderWrapper>
      <h1 className="bold xxxlarge">{title}</h1>
      <div>{children}</div>
    </PageHeaderWrapper>
  );
};

export default PageHeader;

import React from 'react';
import { PageHeaderWrapper } from './PageHeader.styles';

const PageHeader: React.FunctionComponent<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <PageHeaderWrapper>
      <h1 className="bold xxxlarge">{title}</h1>
      <div>{children}</div>
    </PageHeaderWrapper>
  );
};

export default PageHeader;

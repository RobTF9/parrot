import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

const QueryContext: React.FunctionComponent = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryContext;

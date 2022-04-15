import React from 'react';
import Loading from '../components/Loading';
import Table from '../components/Table';
import useAdminService from '../hooks/useAdminService';
import { Header, Main } from '../styles/Layout.styles';

const Admin: React.FC = () => {
  const { data, loading } = useAdminService();

  if (loading) return <Loading />;
  return (
    <Main>
      <Header>
        <h1 className="bold xlarge margin-b">Admin</h1>
        {data?.users[0] && (
          <section>
            <h2 className="bold large margin-b">Users</h2>
          </section>
        )}
        {data &&
          Object.entries(data).map(
            ([key, value]) =>
              value[0] && (
                <section>
                  <h2 className="bold large margin-b">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h2>
                  <Table
                    {...{
                      data: value,
                      columns: Object.keys(value[0]).map((k) => ({
                        Header: k,
                        accessor: k,
                      })),
                    }}
                  />
                </section>
              )
          )}
      </Header>
    </Main>
  );
};

export default Admin;

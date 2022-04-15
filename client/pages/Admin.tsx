import React from 'react';
import Loading from '../components/Loading';
import Table from '../components/Table';
import useAdminService from '../hooks/useAdminService';
import { Header } from '../styles/Layout.styles';

const Admin: React.FC = () => {
  const { data, loading } = useAdminService();

  if (loading) return <Loading />;
  return (
    <>
      <Header>
        <h1 className="bold xlarge margin-b">Admin</h1>
        {data &&
          Object.entries(data).map(
            ([key, value]) =>
              value[0] && (
                <section className="margin-b">
                  <h2 className="bold large margin-b">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h2>
                  <Table
                    {...{
                      data: value,
                      columns: Object.entries(value[0]).map(([k, v]) => ({
                        Header: k,
                        accessor: k,
                        Cell: typeof v !== 'string' ? JSON.stringify(v) : v,
                      })),
                    }}
                  />
                </section>
              )
          )}
      </Header>
    </>
  );
};

export default Admin;

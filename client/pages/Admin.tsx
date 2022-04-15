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
          <section className="margin-b">
            <h2 className="bold large margin-b">Users</h2>
            <Table
              {...{
                data: data?.users,
                columns: Object.keys(data?.users[0]).map((k) => ({
                  Header: k,
                  accessor: k,
                })),
              }}
            />
          </section>
        )}
        {data?.parrots[0] && (
          <section className="margin-b">
            <h2 className="bold large margin-b">Parrots</h2>
            <Table
              {...{
                data: data?.parrots,
                columns: [
                  { Header: 'Language', accessor: 'language.name' },
                  {
                    Header: 'Created by',
                    accessor: 'createdBy',
                    Cell: ({ row }: { row: { original: ParrotResource } }) =>
                      data.users.find(
                        ({ _id }) => _id === row.original.createdBy
                      )?.username || '',
                  },
                  {
                    Header: 'Phrase goal',
                    accessor: 'goals.phrase',
                  },
                  {
                    Header: 'Game goal',
                    accessor: 'goals.games',
                  },
                ],
              }}
            />
          </section>
        )}
        {data?.phrases[0] && (
          <section className="margin-b">
            <h2 className="bold large margin-b">Phrases</h2>
            <Table
              {...{
                data: data?.phrases,
                columns: [
                  { Header: 'Phrase', accessor: 'lang' },
                  { Header: 'Translation', accessor: 'tran' },
                  { Header: 'Pronounciation', accessor: 'pron' },
                  {
                    Header: 'Created by',
                    accessor: 'createdBy',
                    Cell: ({ row }: { row: { original: PhraseResource } }) =>
                      data.users.find(
                        ({ _id }) => _id === row.original.createdBy
                      )?.username || '',
                  },
                  {
                    Header: 'Language',
                    accessor: 'parrot',
                    Cell: ({ row }: { row: { original: PhraseResource } }) =>
                      data.parrots.find(
                        ({ _id }) => _id === row.original.parrot
                      )?.language.name || '',
                  },
                ],
              }}
            />
          </section>
        )}
      </Header>
    </Main>
  );
};

export default Admin;

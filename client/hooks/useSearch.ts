import React, { useState, useEffect } from 'react';

export interface SearchChangeHandler {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

interface SelectChangeHandler {
  (event: React.ChangeEvent<HTMLSelectElement>): void;
}

interface UseSearch {
  (items: ItemResource[], tags: TagResource[]): {
    filtered: ItemResource[];
    search: string;
    filter: string;
    changeHandler: SearchChangeHandler;
    selectChangeHandler: SelectChangeHandler;
  };
}

const useSearch: UseSearch = (items, tags) => {
  const [filtered, setFiltered] = useState(items);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const changeHandler: SearchChangeHandler = (event) =>
    setSearch(event.target.value);

  const selectChangeHandler: SelectChangeHandler = (event) =>
    setFilter(event.target.value);

  useEffect(() => {
    if (filter === 'All') {
      setFiltered(items);
    } else {
      setFiltered(items.filter((item) => item.tags.includes(filter)));
    }
  }, [filter]);

  useEffect(() => {
    if (!items) return;
    setFiltered(
      items.filter((item) => {
        if (
          item.pron.toUpperCase().includes(search.toUpperCase()) ||
          item.tran.toUpperCase().includes(search.toUpperCase()) ||
          item.lang.includes(search)
        ) {
          return item;
        }
        if (item.tags) {
          if (
            item.tags
              .map((tag) => tags.find((t) => t._id === tag)?.tag)
              .includes(search)
          ) {
            return item;
          }
        }
        return null;
      })
    );
  }, [search, items]);

  return { filtered, changeHandler, search, filter, selectChangeHandler };
};

export default useSearch;

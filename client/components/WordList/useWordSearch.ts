import React, { useState, useEffect } from 'react';

interface SearchChangeHandler {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

interface SelectChangeHandler {
  (event: React.ChangeEvent<HTMLSelectElement>): void;
}
interface UseWordSearch {
  (words: WordResource[], tags: TagResource[]): {
    filtered: Array<WordResource>;
    search: string;
    filter: string;
    changeHandler: SearchChangeHandler;
    selectChangeHandler: SelectChangeHandler;
  };
}

const useWordSearch: UseWordSearch = (words, tags) => {
  const [filtered, setFiltered] = useState(words);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const changeHandler: SearchChangeHandler = (event) =>
    setSearch(event.target.value);

  const selectChangeHandler: SelectChangeHandler = (event) =>
    setFilter(event.target.value);

  useEffect(() => {
    if (filter === 'All') {
      setFiltered(words);
    } else {
      setFiltered(words.filter((word) => word.tags.includes(filter)));
    }
  }, [filter]);

  useEffect(() => {
    if (!words) return;
    const terms = search.split(' ');
    setFiltered(
      words.filter((word) =>
        terms.some((term) => {
          if (
            word.pron.toUpperCase().includes(term.toUpperCase()) ||
            word.tran.toUpperCase().includes(term.toUpperCase()) ||
            word.lang.includes(term)
          ) {
            return word;
          }
          if (word.tags) {
            if (
              word.tags
                .map((tag) => tags.find((t) => t._id === tag)?.tag)
                .includes(term)
            ) {
              return word;
            }
          }
          return null;
        })
      )
    );
  }, [search, words]);

  return { filtered, changeHandler, search, filter, selectChangeHandler };
};

export default useWordSearch;

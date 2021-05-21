import React, { useState, useEffect } from 'react';

const useWordSearch = (
  words: Array<WordResource>,
  tags: Array<TagResource>
): {
  filtered: Array<WordResource>;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  filter: string;
  selectChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} => {
  const [filtered, setFiltered] = useState(words);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>
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

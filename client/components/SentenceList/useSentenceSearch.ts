import React, { useState, useEffect } from 'react';

interface SearchChangeHandler {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

interface SelectChangeHandler {
  (event: React.ChangeEvent<HTMLSelectElement>): void;
}

interface UseSentenceSearch {
  (sentences: SentenceResource[], tags: TagResource[]): {
    filtered: SentenceResource[];
    search: string;
    filter: string;
    changeHandler: SearchChangeHandler;
    selectChangeHandler: SelectChangeHandler;
  };
}

const useSentenceSearch: UseSentenceSearch = (sentences, tags) => {
  const [filtered, setFiltered] = useState(sentences);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const changeHandler: SearchChangeHandler = (event) =>
    setSearch(event.target.value);

  const selectChangeHandler: SelectChangeHandler = (event) =>
    setFilter(event.target.value);

  useEffect(() => {
    if (filter === 'All') {
      setFiltered(sentences);
    } else {
      setFiltered(
        sentences.filter((sentence) => sentence.tags.includes(filter))
      );
    }
  }, [filter]);

  useEffect(() => {
    if (!sentences) return;
    setFiltered(
      sentences.filter((sentence) => {
        if (
          sentence.pron.toUpperCase().includes(search.toUpperCase()) ||
          sentence.tran.toUpperCase().includes(search.toUpperCase()) ||
          sentence.lang.includes(search)
        ) {
          return sentence;
        }
        if (sentence.tags) {
          if (
            sentence.tags
              .map((tag) => tags.find((t) => t._id === tag)?.tag)
              .includes(search)
          ) {
            return sentence;
          }
        }
        return null;
      })
    );
  }, [search, sentences]);

  return { filtered, changeHandler, search, filter, selectChangeHandler };
};

export default useSentenceSearch;

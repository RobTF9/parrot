import React, { useState, useEffect } from 'react';

const useSentenceSearch = (
  sentences: Array<SentenceResource>,
  tags: Array<TagResource>
): {
  filtered: Array<SentenceResource>;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  filter: string;
  selectChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} => {
  const [filtered, setFiltered] = useState(sentences);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>
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

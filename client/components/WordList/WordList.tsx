import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '../../styles/Layout.styles';
import { Tag } from '../../styles/Buttons.styles';
import { WordWrapper, Filter } from './WordList.styles';
import Input from '../Input';
import useWordSearch from './useWordSearch';
import Select from '../Select';
import formatDate from '../../utils/formatDate';

interface Props {
  words: {
    data: WordResource[];
  };
  tags: {
    data: TagResource[];
  };
}

const WordList: React.FC<Props> = ({ words, tags }) => {
  const {
    filtered,
    changeHandler,
    search,
    filter,
    selectChangeHandler,
  } = useWordSearch(words.data, tags.data);

  return (
    <>
      <Filter>
        <Input
          {...{
            value: search,
            onChange: changeHandler,
            label: 'Search words',
            name: 'search',
          }}
        />
        <Select
          {...{
            label: 'Filter by tag',
            name: 'tags',
            defaultValue: filter,
            onChange: selectChangeHandler,
            options: [
              { copy: 'Show all', value: 'All' },
              ...tags.data.map(({ tag, _id }) => ({ copy: tag, value: _id })),
            ],
          }}
        />
      </Filter>
      <Grid
        as="ul"
        className="margin-b-xl"
        columns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {filtered.map((word) => (
          <WordWrapper as={Link} key={word._id} to={`/words/${word._id}`}>
            <p className="border-b-s">
              <span className="bold">{word.lang}</span> – {word.pron}
            </p>
            <p>{word.tran}</p>
            <ul className={`margin-t ${word.updatedBy && 'margin-b'}`}>
              {word.tags.map((tag) => {
                const t = tags.data.find(({ _id }) => tag === _id);
                if (t) {
                  return (
                    <Tag as="li" className="small" key={tag}>
                      {t.tag}
                    </Tag>
                  );
                }
                return null;
              })}
            </ul>
            {word.updatedBy && (
              <em className="small">
                {word.updatedBy.username} updated at{' '}
                {formatDate(word.updatedAt)}
              </em>
            )}
          </WordWrapper>
        ))}
      </Grid>
    </>
  );
};

export default WordList;

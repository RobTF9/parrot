import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '../../styles/Layout.styles';
import { Tag } from '../../styles/Buttons.styles';
import { SentenceWrapper, Filter } from './SentenceList.styles';
import Input from '../Input';
import Select from '../Select';
import useSearch from '../../hooks/useSearch';
import formatDate from '../../utils/formatDate';

interface Props {
  sentences: {
    data: ItemResource[];
  };
  tags: {
    data: TagResource[];
  };
}

const SentenceList: React.FC<Props> = ({ sentences, tags }) => {
  const {
    search,
    filtered,
    filter,
    changeHandler,
    selectChangeHandler,
  } = useSearch(sentences.data, tags.data);

  return (
    <>
      <Filter>
        <Input
          {...{
            value: search,
            onChange: changeHandler,
            label: 'Search for a sentence',
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
        columns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        {filtered.map((sentence) => (
          <SentenceWrapper
            as={Link}
            key={sentence._id}
            to={`/sentences/${sentence._id}`}
          >
            <p className="bold">{sentence.lang}</p>
            <p className="border-b-s">{sentence.pron}</p>
            <p>{sentence.tran}</p>
            <ul className={`margin-t ${sentence.updatedBy && 'margin-b'}`}>
              {sentence.tags.map((tag) => {
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
            {sentence.updatedBy && (
              <em className="small">
                {sentence.updatedBy.username} updated at{' '}
                {formatDate(sentence.updatedAt)}
              </em>
            )}
          </SentenceWrapper>
        ))}
      </Grid>{' '}
    </>
  );
};

export default SentenceList;

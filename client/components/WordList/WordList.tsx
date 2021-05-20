import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '../../styles/Layout.styles';
import { Tag } from '../../styles/Buttons.styles';
import { WordWrapper } from './WordList.styles';

interface Props {
  words: {
    data: WordResource[];
  };
  tags: {
    data: TagResource[];
  };
}

const WordList: React.FC<Props> = ({ words, tags }) => {
  return (
    <Grid
      as="ul"
      className="margin-b-xl"
      columns="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {words.data.map((word) => (
        <WordWrapper as={Link} key={word._id} to={`/words/${word._id}`}>
          <p className="border-b-s">
            <span className="bold">{word.lang}</span> – {word.pron}
          </p>
          <p>{word.tran}</p>
          <ul className="margin-t">
            {word.tags.map((tag) => {
              const t = tags.data.find(({ _id }) => tag === _id);
              if (t) {
                return (
                  <Tag as="li" className="small" key={tag} color={t.color}>
                    {t.tag}
                  </Tag>
                );
              }
              return null;
            })}
          </ul>
        </WordWrapper>
      ))}
    </Grid>
  );
};

export default WordList;

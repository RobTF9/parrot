import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '../../styles/Layout.styles';
import { Tag, WordWrapper } from './WordList.styles';

interface Props {
  words: {
    data: WordResource[];
  };
}

const WordList: React.FC<Props> = ({ words }) => {
  return (
    <Grid
      as="ul"
      className="margin-b"
      columns="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {words.data.map((word) => (
        <WordWrapper as={Link} key={word._id} to={`/words/${word._id}`}>
          <p className="border-b-s">
            <span className="bold">{word.lang}</span> – {word.pron}
          </p>
          <p>{word.tran}</p>
          <ul className="margin-t">
            {word.tags.map((tag) => (
              <Tag className="small" key={tag.text} color={tag.color}>
                {tag.text}
              </Tag>
            ))}
          </ul>
        </WordWrapper>
      ))}
    </Grid>
  );
};

export default WordList;

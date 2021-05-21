import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '../../styles/Layout.styles';
import { Tag } from '../../styles/Buttons.styles';
import { SentenceWrapper } from './SentenceList.styles';

interface Props {
  sentences: {
    data: SentenceResource[];
  };
  tags: {
    data: TagResource[];
  };
}

const SentenceList: React.FC<Props> = ({ sentences, tags }) => {
  return (
    <Grid
      as="ul"
      className="margin-b-xl"
      columns="repeat(auto-fill, minmax(400px, 1fr))"
    >
      {sentences.data.map((sentence) => (
        <SentenceWrapper
          as={Link}
          key={sentence._id}
          to={`/sentences/${sentence._id}`}
        >
          <p className="bold">{sentence.lang}</p>
          <p className="border-b-s">{sentence.pron}</p>
          <p>{sentence.tran}</p>
          <ul className="margin-t">
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
        </SentenceWrapper>
      ))}
    </Grid>
  );
};

export default SentenceList;

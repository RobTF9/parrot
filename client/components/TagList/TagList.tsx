import React from 'react';
import { Tag } from '../../styles/Buttons.styles';
import { TagListWrapper } from './TagList.styles';

interface Props {
  items: ItemResource[];
  tags: TagResource[];
}

const TagList: React.FC<Props> = ({ items, tags }) => {
  const flat = items.map((i) => i.tags).flat();
  const unique = [...new Set(flat)];
  const filtered = tags.filter((tag) => unique.includes(tag._id));

  return (
    <TagListWrapper>
      <ul>
        {filtered.map((tag) => (
          <Tag as="li" key={tag._id}>
            {tag.tag}
          </Tag>
        ))}
      </ul>
    </TagListWrapper>
  );
};

export default TagList;

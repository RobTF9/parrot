import React, { useState } from 'react';
import { UseMutateFunction } from 'react-query';
import { StrokeButton } from '../../styles/Buttons.styles';
import { TagCreatorWrapper } from './TagCreator.styles';
import Input from '../Input';

interface Props {
  tagMutate: UseMutateFunction<
    ServerReponse<TagResource>,
    unknown,
    TagSubmission,
    unknown
  >;
}

const TagCreator: React.FC<Props> = ({ tagMutate }) => {
  const [tag, setTag] = useState({ tag: '', color: '' });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTag({ ...tag, [event.target.name]: event.target.value });

  return (
    <TagCreatorWrapper>
      <Input
        {...{ label: 'Add a new tag', value: tag.tag, onChange, name: 'tag' }}
      />
      <StrokeButton {...{ onClick: () => tagMutate(tag), type: 'button' }}>
        Add tag
      </StrokeButton>
    </TagCreatorWrapper>
  );
};

export default TagCreator;

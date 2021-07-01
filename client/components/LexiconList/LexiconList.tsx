import React, { useState } from 'react';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import { Button } from '../../styles/Buttons.styles';
import Input from '../Input';
import {
  ListWrapper,
  Action,
  ShareForm,
  SharedWidth,
} from './LexiconList.styles';
import { shareLexicon } from '../../api/resources/lexicon';
import { useMessageContext } from '../../context/Message';
import { Loading } from '../../styles/Animations.styles';

interface ItemProps {
  _id: string;
  activate: (_id: string) => void;
  lexicon?: LexiconSession;
  language: {
    name: string;
  };
  createdBy: { username: string; email: string };
  sharedWith: { _id: string; username: string; email: string }[];
  share: boolean;
  buttons?: boolean;
}

const LexiconItem: React.FC<ItemProps> = ({
  language,
  activate,
  lexicon,
  share,
  _id,
  createdBy,
  sharedWith,
}) => {
  const [email, setEmail] = useState('');
  const { showMessage, hideMessage } = useMessageContext();

  const [update, updateLoading] = shareLexicon(_id, (res) => {
    if (res.message) {
      showMessage(res.message);
    }
  });

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    update({ email });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    hideMessage();
    setEmail(event.target.value);
  };

  return (
    <>
      {updateLoading && <Loading bg />}
      <li className={lexicon?._id === _id ? 'active ' : ''}>
        <p>
          {language.name}
          {createdBy.username && (
            <em className="small">
              {' '}
              – Created by: <span className="bold">{createdBy.username}</span> (
              {createdBy.email})
            </em>
          )}
        </p>
        <div>
          <Action
            className="medium"
            type="button"
            onClick={() => activate(_id)}
          >
            {lexicon?._id === _id ? (
              <>
                <FiCheckCircle /> Active
              </>
            ) : (
              <>
                <FiCircle /> Set active
              </>
            )}
          </Action>
        </div>
      </li>
      {share && sharedWith && sharedWith.length > 0 ? (
        <SharedWidth>
          Already shared with:{' '}
          {sharedWith.map((shared) => (
            <em className="bold" key={shared.username}>
              {shared.username && shared.username} – {shared.email}
            </em>
          ))}
        </SharedWidth>
      ) : (
        <ShareForm onSubmit={onSubmit}>
          <Input
            {...{
              label: `Share ${language.name} via email`,
              value: email,
              name: 'email',
              onChange,
            }}
          />
          <Button type="submit">Share</Button>
        </ShareForm>
      )}
    </>
  );
};

interface ListProps {
  lexicons: {
    data: LexiconResource[];
  };
  activate: (_id: string) => void;
  emptyMessage: string;
  share?: boolean;
  lexicon?: LexiconSession;
}

const LexiconList: React.FC<ListProps> = ({
  lexicons,
  activate,
  emptyMessage,
  share,
  lexicon,
}) => {
  return (
    <ListWrapper>
      {lexicons.data.length > 0 ? (
        lexicons.data.map(({ language, _id, createdBy, sharedWith }) => (
          <LexiconItem
            key={_id}
            {...{
              share: !!share,
              language,
              activate,
              createdBy,
              sharedWith,
              lexicon,
              _id,
            }}
          />
        ))
      ) : (
        <p>{emptyMessage}</p>
      )}
    </ListWrapper>
  );
};

export default LexiconList;

import React, { useState } from 'react';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import { Button } from '../../styles/Buttons.styles';
import Input from '../Input';
import { ListWrapper, Action, ShareForm } from './LexiconList.styles';
import { shareLexicon } from '../../api/resources/lexicon';
import { useMessageContext } from '../../context/Message';

interface ItemProps {
  _id: string;
  activate: (_id: string) => void;
  lexicon?: string;
  language: {
    name: string;
  };
  share: boolean;
}

const LexiconItem: React.FC<ItemProps> = ({
  language,
  activate,
  lexicon,
  share,
  _id,
}) => {
  const [shareField, setShareField] = useState(false);
  const [email, setEmail] = useState('');
  const { updateMessage, hideMessage } = useMessageContext();
  const [update] = shareLexicon(
    _id,
    (res) => res.message && updateMessage(res.message)
  );

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    update({ email });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    hideMessage();
    setEmail(event.target.value);
  };

  return (
    <>
      <li className={lexicon === _id ? 'active' : ''}>
        <p>{language.name}</p>
        <div>
          <Action
            className="medium"
            type="button"
            onClick={() => activate(_id)}
          >
            {lexicon === _id ? (
              <>
                <FiCheckCircle /> Active
              </>
            ) : (
              <>
                <FiCircle /> Set active
              </>
            )}
          </Action>
          {share && (
            <Action
              className="share medium"
              type="button"
              onClick={() => setShareField(!shareField)}
            >
              Share
            </Action>
          )}
        </div>
      </li>
      {shareField && (
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
  lexicon?: string;
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
        lexicons.data.map(({ language, _id }) => (
          <LexiconItem
            key={_id}
            {...{
              share: !!share,
              language,
              activate,
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

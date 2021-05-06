import React, { useState } from 'react';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import { ListWrapper } from './LexiconList.styles';

interface Props {
  lexicons: {
    data: LexiconResource[];
  };
  activate: (_id: string) => void;
  emptyMessage: string;
  share?: (email: string) => void;
  lexicon?: string;
}

const LexiconList: React.FC<Props> = ({
  lexicons,
  activate,
  emptyMessage,
  share,
  lexicon,
}) => {
  const [shareField, setShareField] = useState(false);
  return (
    <ListWrapper>
      {lexicons.data.length > 0 ? (
        lexicons.data.map(({ language, _id }) => (
          <li key={_id} className={lexicon === _id ? 'active' : ''}>
            <p>{language.name}</p>
            <button
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
            </button>
            {share && (
              <button
                className="share medium"
                type="button"
                onClick={() => setShareField(!shareField)}
              >
                Share
              </button>
            )}
          </li>
        ))
      ) : (
        <p>{emptyMessage}</p>
      )}
    </ListWrapper>
  );
};

export default LexiconList;

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  FiCheckCircle,
  FiChevronDown,
  FiCircle,
  FiDatabase,
  FiUser,
} from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { NavWrapper, LexiconSwitch } from './Navigation.styles';

interface Props {
  lexicon?: LexiconSession;
  authenticated: boolean;
  yourLexicons?: { data: LexiconResource[] };
  sharedLexicons?: { data: LexiconResource[] };
  activateLexicon: (id: string) => void;
}

const Navigation: React.FC<Props> = ({
  lexicon,
  authenticated,
  yourLexicons,
  sharedLexicons,
  activateLexicon,
}) => {
  const [showLexicons, setShowLexicons] = useState(false);
  return (
    <NavWrapper>
      <div>
        <p>Parrot</p>
        {authenticated && (
          <LexiconSwitch>
            <button
              type="button"
              onClick={() => setShowLexicons(!showLexicons)}
            >
              Active Lexicon:{' '}
              <span className="bold">{lexicon?.language.name}</span>{' '}
              <FiChevronDown />
            </button>
            <AnimatePresence>
              {showLexicons && (
                <motion.ul>
                  {yourLexicons && yourLexicons.data.length > 0 && (
                    <>
                      <p className="small">Yours</p>
                      {yourLexicons.data.map((l) => (
                        <li key={l._id}>
                          {l._id === lexicon?._id ? (
                            <p>
                              <FiCheckCircle /> {l.language.name}
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={() => activateLexicon(l._id)}
                            >
                              <FiCircle /> {l.language.name}
                            </button>
                          )}
                        </li>
                      ))}
                    </>
                  )}
                  {sharedLexicons && sharedLexicons.data.length > 0 && (
                    <>
                      <p className="small">Shared with you</p>
                      {sharedLexicons.data.map((l) => (
                        <li key={l._id}>
                          {l._id === lexicon?._id ? (
                            <p>
                              <FiCheckCircle /> {l.language.name}
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={() => activateLexicon(l._id)}
                            >
                              <FiCircle /> {l.language.name} - {l.createdBy}
                            </button>
                          )}
                        </li>
                      ))}
                    </>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </LexiconSwitch>
        )}
        {lexicon && (
          <ul>
            <li>
              <NavLink exact to="/words">
                Words
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/sentences">
                Sentences
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/games">
                Games
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {authenticated && (
        <ul>
          <li>
            <Link
              className="toggle"
              to={(location) => `${location.pathname}?account=open`}
            >
              <FiUser />
              Account
            </Link>
          </li>
          <li>
            <Link
              className="toggle"
              to={(location) => `${location.pathname}?lexicons=open`}
            >
              <FiDatabase />
              Lexicons
            </Link>
          </li>
        </ul>
      )}
    </NavWrapper>
  );
};

export default Navigation;

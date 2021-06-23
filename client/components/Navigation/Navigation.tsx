import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  FiCheckCircle,
  FiChevronDown,
  FiCircle,
  FiDatabase,
  FiMenu,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import {
  NavWrapper,
  LexiconSwitch,
  BurgerButton,
  MainLinks,
  LinksWrapper,
  MobileLinks,
} from './Navigation.styles';
import { bumpUp } from '../../utils/animations';

interface Props {
  lexicon?: LexiconSession;
  yourLexicons?: { data: LexiconResource[] };
  sharedLexicons?: { data: LexiconResource[] };
  activateLexicon: (id: string) => void;
  user?: UserResource;
}

const Navigation: React.FC<Props> = ({
  lexicon,
  yourLexicons,
  sharedLexicons,
  activateLexicon,
  user,
}) => {
  const [showLexicons, setShowLexicons] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  return (
    <>
      <NavWrapper>
        <div>
          <p>Parrot</p>
          <LexiconSwitch show={showLexicons}>
            <button
              type="button"
              onClick={() => setShowLexicons(!showLexicons)}
            >
              {!lexicon ? (
                'Select a lexicon'
              ) : (
                <span className="bold">{lexicon?.language.name}</span>
              )}{' '}
              <FiChevronDown />
            </button>
            <AnimatePresence>
              {showLexicons && (
                <motion.ul {...{ ...bumpUp }}>
                  {yourLexicons && yourLexicons.data.length > 0 && (
                    <>
                      <p className="small">Your lexicons</p>
                      {yourLexicons.data.map((l) => (
                        <li key={l._id}>
                          {l._id === lexicon?._id ? (
                            <p>
                              <FiCheckCircle /> {l.language.name}
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                activateLexicon(l._id);
                                setShowLexicons(false);
                              }}
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
                      <p className="small">Shared lexicons</p>
                      {sharedLexicons.data.map((l) => (
                        <li key={l._id}>
                          {l._id === lexicon?._id ? (
                            <p>
                              <FiCheckCircle /> {l.language.name}
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                activateLexicon(l._id);
                                setShowLexicons(false);
                              }}
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
          <LinksWrapper>
            <BurgerButton
              type="button"
              onClick={() => setMobileDropdown(!mobileDropdown)}
            >
              {mobileDropdown ? <FiX /> : <FiMenu />}
            </BurgerButton>
            {lexicon && (
              <MainLinks>
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
              </MainLinks>
            )}
          </LinksWrapper>
        </div>
        <ul>
          <li>
            <Link
              className="toggle"
              to={(location) => `${location.pathname}?account=open`}
            >
              <FiUser />
              <span className="bold">{user ? user.username : 'Account'}</span>
            </Link>
          </li>
          <li>
            <Link
              className="toggle"
              to={(location) => `${location.pathname}?lexicons=open`}
            >
              <FiDatabase />
              <span className="bold">Lexicons</span>
            </Link>
          </li>
        </ul>
      </NavWrapper>
      {lexicon && mobileDropdown && (
        <MobileLinks>
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
        </MobileLinks>
      )}
    </>
  );
};

export default Navigation;

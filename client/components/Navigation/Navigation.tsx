import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, createRef } from 'react';
import {
  FiCheckCircle,
  FiChevronDown,
  FiCircle,
  FiDatabase,
  FiMenu,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import {
  NavWrapper,
  LexiconSwitch,
  BurgerButton,
  MainLinks,
  LinksWrapper,
  Toggle,
} from './Navigation.styles';
import { bumpUp } from '../../utils/animations';
import { Badge } from '../../styles/Buttons.styles';
import useOnClickOutside from '../../hooks/useClickOutside';

interface Props {
  lexicon?: LexiconSession;
  yourLexicons?: { data: LexiconResource[] };
  sharedLexicons?: { data: LexiconResource[] };
  unreadNotifications?: { data: NotificationResource[] };
  activateLexicon: (id: string) => void;
  user?: UserResource;
  setModalState: (state: 'USER' | 'LEXICON' | 'CLOSED') => void;
}

const Navigation: React.FC<Props> = ({
  lexicon,
  yourLexicons,
  sharedLexicons,
  activateLexicon,
  unreadNotifications,
  user,
  setModalState,
}) => {
  const LexiconRef = createRef<HTMLUListElement>();
  const [showLexicons, setShowLexicons] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  useOnClickOutside(LexiconRef, () => setShowLexicons(false));

  return (
    <NavWrapper>
      <div>
        <p>Parrot</p>
        <LexiconSwitch show={showLexicons}>
          <button type="button" onClick={() => setShowLexicons(!showLexicons)}>
            {!lexicon ? (
              'Select a lexicon'
            ) : (
              <span className="bold">{lexicon?.language.name}</span>
            )}{' '}
            <FiChevronDown />
          </button>
          <AnimatePresence>
            {showLexicons && (
              <motion.ul {...{ ...bumpUp, ref: LexiconRef }}>
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
                            <FiCircle /> {l.language.name} -{' '}
                            {l.createdBy.username}
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
            <MainLinks {...{ mobileDropdown }}>
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
          {unreadNotifications && unreadNotifications.data.length > 0 && (
            <Badge>{unreadNotifications.data.length}</Badge>
          )}
          <Toggle as="a" type="button" onClick={() => setModalState('USER')}>
            <FiUser />
            <span className="bold">{user ? user.username : 'Account'}</span>
          </Toggle>
        </li>
        <li>
          <Toggle
            as="button"
            className="toggle"
            type="button"
            onClick={() => setModalState('LEXICON')}
          >
            <FiDatabase />
            <span className="bold">Lexicons</span>
          </Toggle>
        </li>
      </ul>
    </NavWrapper>
  );
};

export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavWrapper } from './Navigation.styles';

interface Props {
  lexicon?: string;
  authenticated: boolean;
}

const Navigation: React.FC<Props> = ({ lexicon, authenticated }) => {
  return (
    <NavWrapper>
      <p>Parrot</p>
      <ul>
        {authenticated && (
          <li>
            <NavLink exact to="/">
              Account
            </NavLink>
          </li>
        )}
        {lexicon && (
          <>
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
          </>
        )}
      </ul>
    </NavWrapper>
  );
};

export default Navigation;

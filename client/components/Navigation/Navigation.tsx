import React from 'react';
import { FiDatabase, FiUser } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import { NavWrapper } from './Navigation.styles';

interface Props {
  lexicon?: string;
  authenticated: boolean;
}

const Navigation: React.FC<Props> = ({ lexicon, authenticated }) => {
  return (
    <NavWrapper>
      <div>
        <p>Parrot</p>
        {authenticated && <p>Select your lexicon</p>}
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

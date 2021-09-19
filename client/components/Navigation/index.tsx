import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationWrapper } from './Navigation.styles';

interface Props {
  links: { to: string; text: string }[];
}

const Navigation: React.FC<Props> = ({ links }) => {
  return (
    <NavigationWrapper>
      <ul>
        {links.map(({ to, text }) => (
          <li key={text}>
            <NavLink exact activeClassName="active" to={to}>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </NavigationWrapper>
  );
};

export default Navigation;

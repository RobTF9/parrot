import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button';
import { NavigationWrapper } from './styles';

interface Props {
  links: { to: string; text: string }[];
  logout: () => void;
}

const Navigation: React.FC<Props> = ({ links, logout }) => {
  return (
    <NavigationWrapper className="border-b">
      <ul>
        {links.map(({ to, text }) => (
          <li key={text}>
            <NavLink exact activeClassName="active" to={to}>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
      <Button {...{ action: logout }}>Logout</Button>
    </NavigationWrapper>
  );
};

export default Navigation;

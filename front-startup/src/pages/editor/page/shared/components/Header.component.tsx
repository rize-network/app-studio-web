import React from 'react';
import { Link, DropdownMenu } from '@app-studio/web';

export interface HeaderMenuLink {
  id: string;
  label: string;
  href: string;
}

export interface HeaderMenuItem {
  id: string;
  title: string;
  href?: string;
  dropdown?: HeaderMenuLink[];
}

export interface HeaderProps {
  menus?: HeaderMenuItem[];
}

export const Header: React.FC<HeaderProps> = ({ menus = [] }) => {
  return (
    <nav style={{ display: 'flex', gap: '16px' }}>
      {menus.map((menu) =>
        menu.dropdown && menu.dropdown.length > 0 ? (
          <DropdownMenu
            key={menu.id}
            trigger={<Link to={menu.href || '#'}>{menu.title}</Link>}
            items={menu.dropdown.map((item) => ({
              id: item.id,
              label: item.label,
              onClick: () => {
                window.location.href = item.href;
              },
            }))}
          />
        ) : (
          <Link key={menu.id} to={menu.href || '#'}>
            {menu.title}
          </Link>
        )
      )}
    </nav>
  );
};

export default Header;

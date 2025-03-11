import React from 'react';
import styles from './NavLink.module.css';

export interface NavLinkProps {
  href: string;
  icon: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, icon, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {icon} {children}
    </a>
  );
};

export default NavLink;

import React from 'react';
import Notifications from '../Notifications';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.notificationsWrapper}>
        <Notifications />
      </div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default Header;

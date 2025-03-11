import React from 'react';
import NavLink from '../NavLink';
import styles from './Navigation.module.css';

const navigationLinks = [
  {
    href: "https://docs.novu.co/platform/overview",
    icon: "📚",
    text: "Novu Documentation",
  },
  {
    href: "https://github.com/kate-deriv/Novu-notifications",
    icon: "💻",
    text: "Backend Repository",
  },
  {
    href: "https://novu-notifications-seven.vercel.app/swagger",
    icon: "🔍",
    text: "API Documentation (Swagger)",
  },
] as const;

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.linksContainer}>
      {navigationLinks.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          icon={link.icon}
        >
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;

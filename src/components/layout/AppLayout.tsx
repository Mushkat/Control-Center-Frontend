import { NavLink, Outlet } from 'react-router-dom';
import { ru } from '@/shared/localization/ru';
import { cn } from '@/lib/cn';
import styles from './AppLayout.module.css';

const links = [
  { to: '/', label: ru.nav.welcome },
  { to: '/users', label: ru.nav.users },
  { to: '/groups', label: ru.nav.groups },
];

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.brandWrap}>
            <p className={styles.brand}>{ru.app.brand}</p>
            <p className={styles.brandHint}>{ru.app.subtitle}</p>
          </div>
          <nav className={styles.nav} aria-label={ru.app.mainNavigation}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => cn(styles.navLink, isActive && styles.navLinkActive)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

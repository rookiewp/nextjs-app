import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const router = useRouter();
  const handleClick = useCallback(
    () => { router.push('/user'); },
    [],
  );

  return (
    <div className={styles.header}>
      <div className={styles['header-title']}>
        <div className={styles['header-appicon']} />
        Chicken Music
      </div>
      <div
        className={styles['header-usericon']}
        onClick={handleClick}
      >
        <i className="icon-mine" />
      </div>
    </div>
  );
};

export default Header;

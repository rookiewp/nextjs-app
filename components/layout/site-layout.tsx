import React from 'react';
import Header from '../header';
import Nav from '../nav';
import styles from './site-layout.module.scss';

const SiteLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <Nav />
      <div>{children}</div>
    </div>
  );
};

export default SiteLayout;

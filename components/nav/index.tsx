import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import styles from './nav.module.scss';

const navList = [
  {
    title: '推荐',
    url: '/',
  },
  {
    title: '歌手',
    url: '/singer',
  },
  {
    title: '排行',
    url: '/rank',
  },
  {
    title: '搜索',
    url: '/search',
  },
];

const Nav: React.FC = () => {
  const router = useRouter();
  console.log(router)

  return (
    <div className={styles.nav}>
      {
        navList.map(item => (
          <div
            className={styles['nav-item']}
            key={item.title}
            onClick={() => {
              router.push(item.url);
            }}
          >
            <span
              className={classnames(styles['nav-text'], {
                [styles['nav-active']]: router.pathname === item.url,
              })}
            >
              {item.title}
            </span>
          </div>
        ))
      }
    </div>
  );
};

export default Nav;

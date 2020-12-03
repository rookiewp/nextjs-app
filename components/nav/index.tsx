import React, { useState } from 'react';
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
  const [navIndex, setIndex] = useState<number>(0);

  return (
    <div className={styles.nav}>
      {
        navList.map((item, i) => (
          <div
            className={styles['nav-item']}
            key={item.title}
            onClick={() => {
              setIndex(i);
              router.push(item.url);
            }}
          >
            <span
              className={classnames(styles['nav-text'], {
                [styles['nav-active']]: i === navIndex,
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

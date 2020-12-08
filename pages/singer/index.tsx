import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import BetterScroll from 'better-scroll';
import { getSingerListApi } from './api';
import { IState } from '../../store/reducer';
import { wrapper } from '../../store/index';
import { TSinger, TSingerGroup, TGroup } from './types';
import { normalizeSinger } from '../../lib/util';
import styles from './singer.module.scss';

type SingerList = TSinger[];
interface ISingerListRes {
  code: number;
  data: {
    list: SingerList,
    per_page: number,
    total: number,
    total_page: number,
  },
  message: string,
  subcode: number,
}

interface IProps {
  singerGroup: TSingerGroup;
}

const Singer: React.FC<IProps> = ({ singerGroup }) => {
  const router = useRouter();

  const wraperRef = useRef<HTMLDivElement | undefined>();
  const scrollerRef = useRef<HTMLDivElement | undefined>();

  return (
    <div className={styles.singer}>
      {
        singerGroup.map((group: TGroup) => (
          <div key={group.title}>
            <div className={styles['singer-title']}>{group.title}</div>
            <div className={styles['singer-list']}>
              {
                group.items.map(singer => (
                  <div className={styles['singer-item']} key={singer.name}>
                    <img className={styles['singer-avatar']} src={singer.avatar} alt="" />
                    <span className={styles['singer-name']}>{singer.name}</span>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store }) => {
    const singerListRes: ISingerListRes = await getSingerListApi();
    const singerGroup = normalizeSinger(singerListRes.data.list);
    return {
      props: {
        singerGroup: JSON.parse(JSON.stringify(singerGroup)),
      },
    };
  },
);

const mapStateToProps = (state: IState) => ({ name: state.name });

export default connect(mapStateToProps)(Singer);

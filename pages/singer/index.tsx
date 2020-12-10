import React, {
  useEffect, useCallback, useState, useRef,
} from 'react';
import { connect } from 'react-redux';
// import { useRouter } from 'next/router';
import classnames from 'classnames';
import BtScroll, { IPos } from '../../components/better-scroll';
import { getSingerListApi } from '../../apis/singer.api';
import { IState } from '../../store/reducer';
import { wrapper } from '../../store/index';
import { TSinger, SingerGroup, Group } from '../../types/singer.types';
import { IRes } from '../../types/common.types';
import { normalizeSinger } from '../../lib/util';
import styles from './singer.module.scss';

const TITLE_HEIGHT = 30;

type SingerList = TSinger[];
interface ISingerListRes extends IRes {
  data: {
    list: SingerList,
    per_page: number,
    total: number,
    total_page: number,
  };
}

interface IProps {
  singerGroup: SingerGroup;
}

const Singer: React.FC<IProps> = ({ singerGroup }) => {
  const [currentIndex, setIndex] = useState<number>(0);
  const [currentTitle, setTitle] = useState<string>(singerGroup[0].title);
  const [translateY, setTranslateY] = useState<number>(0);
  const [heightList, setHeightList] = useState<number[]>([]);

  const bScrollRef = useRef<any>();

  useEffect(() => {
    const domList = document.querySelectorAll('.singer-group');
    let height = 0;
    const list = [0];
    Array.from(domList).forEach(item => {
      height += item.clientHeight;
      list.push(height);
    });
    setHeightList(list);
  }, []);

  const handleScroll = useCallback(({ y }: IPos) => {
    // 滚动到最顶端
    if (y >= 0) {
      setIndex(0);
      setTitle(singerGroup[0].title);
      setTranslateY(y);
    } else if (-y >= heightList[heightList.length - 1]) {
      // 滚动到最下面
      setIndex(singerGroup.length - 2);
      setTitle(singerGroup[singerGroup.length - 2].title);
    } else {
      for (let i = 0; i < heightList.length - 1; i++) {
        const height1 = heightList[i];
        const height2 = heightList[i + 1];
        if (-y >= height1 && -y < height2) {
          setIndex(i);
          setTitle(singerGroup[i].title);
          const diff = height2 + y;
          const moveY = (diff > 0 && diff < TITLE_HEIGHT) ? diff - TITLE_HEIGHT : 0;
          setTranslateY(moveY);
          return;
        }
      }
    }
  }, [heightList, currentIndex]);

  return (
    <BtScroll
      onScroll={handleScroll}
      options={{ probeType: 3, click: true }}
      instance={bScrollRef}
    >
      <div className={styles.singer}>
        <div className="scroller">
          {
            singerGroup.map((group: Group) => (
              <div key={group.title} className="singer-group">
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
        <div
          className={classnames(styles['singer-title'], styles['singer-title--fixed'])}
          style={{
            transform: `translate3d(0, ${translateY}px, 0)`,
          }}
        >
          {currentTitle}
        </div>
        <div className={styles['singer-shortlist']}>
          {
            singerGroup.map((group, i) => (
              <div
                key={group.title}
                className={classnames(styles['singer-shortitem'], {
                  [styles['singer-shortitem--active']]: currentIndex === i,
                })}
                onClick={() => {
                  const el = document.querySelectorAll('.singer-group')[i];
                  bScrollRef.current.scrollToElement(el);
                  setIndex(i);
                }}
              >
                {group.title.slice(0, 1)}
              </div>
            ))
          }
        </div>
      </div>
    </BtScroll>
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

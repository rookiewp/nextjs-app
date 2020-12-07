import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { getSliderListApi, getSongListApi } from './api';
import { IState } from '../../store/reducer';
import { wrapper } from '../../store/index';
import styles from './recommend.module.scss';
import Swipe from '../../components/swipe';

type SliderList = {id: number, linkUrl: string, picUrl: string}[];
type SongList = {
  commit_time: string, createtime: string, dissid: string,
  dissname: string, imgurl: string, introduction: string,
  listennum: number, score: number, version: number,
  creator: {
    avatarUrl: string, encrypt_uin: string, followflag: number,
    isVip: number, name: string, qq: number, type: number,
  }
}[];
interface ISliderListRes {
  code: number;
  data: {
    radioList: {Ftitle: string, picUrl: string, radioid: number}[],
    slider: SliderList,
    songList: Record<string, unknown>[]
  }
}
interface ISongListRes {
  code: number;
  data: {
    categoryId: number,
    ein: number,
    sin: number,
    sortId: number,
    sum: number,
    uin: number,
    list: SongList,
  },
  default: number,
  message: string,
  subcode: number,
}

interface IProps {
  sliderList: SliderList;
  songList: SongList;
}

const Recommed: React.FC<IProps> = ({ sliderList, songList }) => {
  const router = useRouter();

  return (
    <div className={styles.recommend}>
      <div className={styles.slider}>
        <Swipe>
          {
            sliderList.map(item => (
              <div key={item.id}>
                <span
                  onClick={() => {
                    // router.push(item.linkUrl);
                    console.log('click');
                  }}
                >
                  <img src={item.picUrl} alt="" style={{ width: '100%' }} />
                </span>
              </div>
            ))
          }
        </Swipe>
      </div>
      <div className={styles['recommend-title']}>
        热门歌单推荐
      </div>
      <div className={styles['recommend-list']}>
        {
          songList.map(item => (
            <div className={styles.song} key={item.dissid}>
              <div className={styles['song-img']}>
                <img width="60" height="60" src={item.imgurl} alt="" />
              </div>
              <div className={styles['song-info']}>
                <div className={styles['song-name']}>{item.creator.name}</div>
                <div className={styles['song-desc']}>{item.dissname}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store }) => {
    const [sliderListRes, songListRes]
      = await Promise.all<ISliderListRes, ISongListRes>([getSliderListApi(), getSongListApi()]);
    return {
      props: {
        sliderList: sliderListRes.data.slider,
        songList: songListRes.data.list,
      },
    };
  },
);

const mapStateToProps = (state: IState) => ({ name: state.name });

export default connect(mapStateToProps)(Recommed);

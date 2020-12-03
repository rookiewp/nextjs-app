import React from 'react';
import { connect } from 'react-redux';
import { getRecommendApi } from './api';
import { IState } from '../../store/reducer';
import { wrapper } from '../../store/index';

type Slider = {id: number, linkUrl: string, picUrl: string}[];
interface IRecommedRes {
  code: number;
  data: {
    radioList: {Ftitle: string, picUrl: string, radioid: number}[],
    slider: Slider,
    songList: Record<string, unknown>[]
  }
}

interface IProps {
  slider: Slider;
  name: string;
  changeName: () => void;
}

const Recommed: React.FC<IProps> = ({ slider, name }) => {
  return (
    <div>
      <h1>推荐页{name}</h1>
      {
        slider.map(item => (
          <div key={item.id}>{item.linkUrl}</div>
        ))
      }
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store }) => {
    const res: IRecommedRes = await getRecommendApi();
    store.dispatch({ type: 'NAME', name: 'pp' });
    return {
      props: { slider: res.data.slider },
    };
  },
);

// export async function getStaticProps(): Promise<{props: { slider: Slider }}> {
//   const res: IRecommedRes = await getRecommendApi<IRecommedRes>();
//   return {
//     props: { slider: res.data.slider },
//   };
// }

const mapStateToProps = (state: IState) => ({ name: state.name });

export default connect(mapStateToProps)(Recommed);

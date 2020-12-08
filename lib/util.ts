import { TSinger, TSingerGroup } from '../pages/singer/types';

class Singer {
  id: string;
  name: string;
  avatar: string;
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`;
  }
}

const HOT_SINGER_LEN = 10;
const HOT_NAME = '热门';
export function normalizeSinger(list: TSinger[]): TSingerGroup {
  const map = {
    hot: {
      title: HOT_NAME,
      items: [],
    },
  };
  list.forEach((item: TSinger, index: number) => {
    if (index < HOT_SINGER_LEN) {
      map.hot.items.push(new Singer({
        name: item.Fsinger_name,
        id: item.Fsinger_mid,
      }));
    }
    const key = item.Findex;
    if (!map[key]) {
      map[key] = {
        title: key,
        items: [],
      };
    }
    map[key].items.push(new Singer({
      name: item.Fsinger_name,
      id: item.Fsinger_mid,
    }));
  });
  // 为了得到有序列表，我们需要处理 map
  const ret = [];
  const hot = [];
  Object.keys(map).forEach((key) => {
    const val = map[key];
    if (val.title.match(/[a-zA-Z]/)) {
      ret.push(val);
    } else if (val.title === HOT_NAME) {
      hot.push(val);
    }
  });
  ret.sort((a, b) => {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
  });
  // return hot.concat(ret);
  return [...hot, ...ret];
}

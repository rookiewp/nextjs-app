import axios from 'axios';
import { commonParams } from '../lib/config';

export function getSliderListApi<T>(): Promise<T> {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  const data = {
    ...commonParams,
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
  };

  return axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com',
    },
    params: data,
  })
    .then((res) => { return res.data; });
}

export function getSongListApi<T>(): Promise<T> {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';

  const data = {
    ...commonParams,
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json',
  };

  return axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com',
    },
    params: data,
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

// export function getSongListApi<T>(disstid: number): Promise<T> {
//   const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

//   const data = {
//     ...commonParams,
//     disstid,
//     type: 1,
//     json: 1,
//     utf8: 1,
//     onlysong: 0,
//     platform: 'yqq',
//     hostUin: 0,
//     needNewCode: 0,
//   };

//   return axios.get(url, {
//     headers: {
//       referer: 'https://c.y.qq.com/',
//       host: 'c.y.qq.com',
//     },
//     params: data,
//   });
// }

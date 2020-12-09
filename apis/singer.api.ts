import axios from 'axios';
import { commonParams } from '../lib/config';

export function getSingerListApi<T>(): Promise<T> {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

  const data = {
    ...commonParams,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
  };

  return axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com',
    },
    params: data,
  })
    .then((res) => {
      return res.data;
    });
}

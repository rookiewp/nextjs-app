import React from 'react';
import { getSongListApi } from '../../apis/recommend.api';
import { ISongListRes } from './index';

type Path = {
  params: {
    id: string,
  }
};

interface IPaths {
  paths: Path[];
  fallback: boolean;
}

const Detail: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div>id: {id}</div>
  );
};

export async function getStaticPaths(): Promise<IPaths> {
  const songListRes = await getSongListApi<ISongListRes>();

  const paths = songListRes.data.list.map(itme => (
    {
      params: {
        id: `${itme.dissid}`,
      },
    }
  ));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default Detail;

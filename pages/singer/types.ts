export type TSinger = {
  Farea: string,
  Fattribute_3: string,
  Fattribute_4: string,
  Fgenre: string,
  Findex: string,
  Fother_name: string,
  Fsinger_id: string,
  Fsinger_mid: string,
  Fsinger_name: string,
  Fsinger_tag: string,
  Fsort: string,
  Ftrend: string,
  Ftype: string,
  voc: string,
};

export type TSingerShort = {
  avatar: string,
  name: string,
  id: string,
};

export type TGroup = {
  title: string;
  items: TSingerShort[]
};

export type TSingerGroup = TGroup[];

import * as types from './action-types';
import { AnyObj } from '../types';

export interface IState {
  name: string,
  singer: AnyObj,
  playing: boolean,
  fullScreen: boolean,
  playlist: AnyObj[],
  sequenceList: AnyObj[],
  mode: number,
  currentIndex: number,
  disc: AnyObj,
  topList: AnyObj,
  // searchHistory: loadSearch(),
  // playHistory: loadPlay(),
  // favoriteList: loadFavorite()
}

interface IAction {
  type: string,
  [propName: string]: any,
}

interface IReducer {
  (state: IState, action: IAction): IState;
}

const defaultState: IState = {
  name: 'wp',
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: 0,
  currentIndex: -1,
  disc: {},
  topList: {},
};

const reducer: IReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SINGER:
      return { ...state, ...{ singer: action.singer } };
    case types.SET_PLAYING_STATE:
      return { ...state, ...{ playing: action.playing } };
    case types.SET_FULL_SCREEN:
      return { ...state, ...{ fullScreen: action.fullScreen } };
    case types.SET_PLAYLIST:
      return { ...state, ...{ playlist: action.playlist } };
    case types.SET_SEQUENCE_LIST:
      return { ...state, ...{ sequenceList: action.sequenceList } };
    case types.SET_PLAY_MODE:
      return { ...state, ...{ mode: action.mode } };
    case types.SET_CURRENT_INDEX:
      return { ...state, ...{ currentIndex: action.currentIndex } };
    case types.SET_DISC:
      return { ...state, ...{ disc: action.disc } };
    case types.SET_TOP_LIST:
      return { ...state, ...{ topList: action.topList } };
    case types.SET_SEARCH_HISTORY:
      return { ...state, ...{ searchHistory: action.searchHistory } };
    case types.SET_PLAY_HISTORY:
      return { ...state, ...{ playHistory: action.playHistory } };
    case types.SET_FAVORITE_LIST:
      return { ...state, ...{ favoriteList: action.favoriteList } };
    default: return state;
  }
};

export default reducer;

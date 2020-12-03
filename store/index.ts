import { createStore, applyMiddleware } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import reducer, { IState } from './reducer';

const makeStore: MakeStore<IState> = () => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<IState>(makeStore);

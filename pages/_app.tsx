import React from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import store from '../store';

interface IProps {
  Component: React.ComponentType,
  pageProps: Record<string, unknown>,
}

const App: React.FC<IProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default App;

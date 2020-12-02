import React from 'react';
import { Provider } from 'react-redux';
import 'normalize.css';
import '../styles/globals.scss';
import store from '../store';
import SiteLayout from '../components/layout/site-layout';

interface IProps {
  Component: React.ComponentType,
  pageProps: Record<string, unknown>,
}

const App: React.FC<IProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  </Provider>
);

export default App;

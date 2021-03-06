import React, { useEffect } from 'react';
import { Store } from 'redux';
import 'normalize.css';
import '../styles/globals.scss';
import { wrapper } from '../store';
import SiteLayout from '../components/layout/site-layout';

interface IProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
  store: Store;
}

const App: React.FC<IProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // document.body.addEventListener('touchstart', (e) => {
    //   e.preventDefault();
    // }, { passive: false });
  }, []);
  return (
    // <Provider store={pageProps.store}>
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
    // </Provider>
  );
};

export default wrapper.withRedux(App);

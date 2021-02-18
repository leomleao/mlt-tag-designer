import React from 'react';
import AppBody from '../AppBody';
import Footer from '../Footer';
import Header from '../Header';

export default function LoadingPage() {
  const heights = {
    header: 21,
    appBody: 73,
    footer: 6,
  };

  return (
    <>
      <Header style={{ height: `${heights.header}vh` }} />
      <AppBody style={{ height: `${heights.appBody}vh` }}>
        <img
          style={{ margin: 'auto', width: '20vw', maxWidth: '200px' }}
          src={'loading.gif'}
          alt="loading..."
        />
      </AppBody>
      <Footer style={{ height: `${heights.footer}vh` }} />
    </>
  );
}

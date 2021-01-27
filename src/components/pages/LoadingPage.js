import React from 'react';
import AppBody from '../AppBody';
import Footer from '../Footer';
import Header from '../Header';

export default function LoadingPage() {
  return (
    <>
      <Header subtitle={'Loading'} />
      <AppBody>
        <img
          style={{ margin: 'auto', width: '20vw', maxWidth: '200px' }}
          src={'loading.gif'}
          alt="loading..."
        />
      </AppBody>
      <Footer />
    </>
  );
}

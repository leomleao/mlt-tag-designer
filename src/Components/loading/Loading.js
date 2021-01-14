import React from 'react';
import AppBody from '../AppBody';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export default function Loading() {
  return (
    <>
      <Header subtitle={'Loading'} />
      <AppBody>
        <img
          style={{ width: '20vw', maxWidth: '200px' }}
          src={'loading.gif'}
          alt="loading..."
        />
      </AppBody>
      <Footer />
    </>
  );
}

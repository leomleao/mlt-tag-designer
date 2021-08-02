import React from 'react';
import AppBody from '../AppBody';
import Footer from '../Footer';
import Header from '../Header';

import styles from '../../styles/styles';

export default function LoadingPage() {
  return (
    <>
      <Header />
      <AppBody>
        <img style={styles.loadingGif} src={'loading.gif'} alt="loading..." />
      </AppBody>
      <Footer />
    </>
  );
}

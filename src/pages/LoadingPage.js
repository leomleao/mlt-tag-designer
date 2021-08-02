// Libs
import React from 'react';

// Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Footer from '../components/styleComponents/Footer';

// Styles
import styles from '../styles/styles';

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

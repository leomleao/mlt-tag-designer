// Libs
import React from 'react';

// Helpers
import { useAuth } from '../helpers/use-auth';
import { useHistory, useLocation } from 'react-router-dom';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';

// functional Components
import SettingsButton from '../components/styleComponents/SettingsButton';
// import Input from '../components/styleComponents/Input';

// Styles
// import styles from '../styles/styles';
// import TextArea from '../components/styleComponents/TextArea';
// import LoadingComponent from '../components/styleComponents/LoadingComponent';

export default function HomeContactForm() {
  const auth = useAuth();
  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: '/' };

  return (
    <>
      <Header>
        <SettingsButton />
        <Button onClick={() => history.push(from)} icon={'navigate_before'} />
      </Header>
      <AppBody>HomeContactForm</AppBody>
      <Footer defaultButtons />
    </>
  );
}

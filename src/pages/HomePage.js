// Libs
import React from 'react';

// Helpers
import { useKeypress } from '../helpers/use-keypress';
import { useHistory } from 'react-router-dom';

// style Components
import Header from '../components/styleComponents/Header';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';

// functional Components
import SettingsButton from '../components/styleComponents/SettingsButton';
import TagDisplay from '../components/styleComponents/TagDisplay';
import ExamplesDisplay from '../components/styleComponents/ExamplesDisplay';

// Styles
import styles from '../styles/styles';

export default function HomePage() {
  const history = useHistory();

  // Shortcut to 'Design your tag' Button
  useKeypress('Enter', () => history.push('/tag-constructor'));
  // localStorage.clear();
  return (
    <>
      <Header>
        <SettingsButton />
      </Header>
      <AppBody>
        <TagDisplay />
        <Button
          style={{
            ...styles.btnFilledPurple,
            // this btn inst in a parent div with width, alignSelf is solution
            alignSelf: 'center',
          }}
          onClick={() => history.push('/tag-constructor')}
          icon={''}
        >
          Design your tag
        </Button>
        <ExamplesDisplay />
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}

import React from 'react';

import { useHistory } from 'react-router-dom';

import AppBody from '../AppBody';
import Footer from '../Footer';
import Header from '../Header';
import Button from '../Button';

import 'react-responsive-modal/styles.css';
import TagDisplay from '../TagDisplay';
import ExampleDisplay from '../ExampleDisplay';
import SettingsButton from '../SettingsButton';

import { useKeypress } from '../../helpers/use-keypress';

import styles from '../../styles/styles';

export default function HomePage() {
  const history = useHistory();

  // Shortcut to 'Design your tag' Button
  useKeypress('Enter', () => history.push('/tag-constructor'));

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
          text={'Design your tag'}
        >
          Design your tag
        </Button>
        <ExampleDisplay />
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}

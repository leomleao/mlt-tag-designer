import React from 'react';
import AppBody from '../components/styleComponents/AppBody';
import Button from '../components/styleComponents/Button';
import Footer from '../components/styleComponents/Footer';
import Header from '../components/styleComponents/Header';
import TagRenderer from '../components/Tag';
import { useHistory, useLocation } from 'react-router-dom';

import styles from '../styles/styles';
import { Tag } from '../utils/Tag';

export default function TagSubmitedPage({}) {
  const history = useHistory();

  return (
    <>
      <Header subtitle={'Order Submited'}>
        <Button onClick={() => history.push('/')} icon={'home'} />
      </Header>

      <AppBody>
        <div style={{ ...styles.divFlexColumn, alignItems: 'center' }}>
          {/* <Tag tag={TAGs[0]} size={200} /> */}
          <div
            style={{
              textAlign: 'center',
              color: '#520369',
              fontFamily: "'Quicksand', sans-serif",
              margin: '1em',
              fontWeight: '600',
              fontSize: 'calc(8px + 1.5vmin)',
            }}
          >
            <div style={{ margin: '0.5em' }}>We receive your order</div>
            <div style={{ margin: '0.5em' }}>and</div>
            <div style={{ margin: '0.5em' }}>soon will be shipped to you</div>
          </div>
        </div>
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}

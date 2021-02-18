import React, { useState } from 'react';
import Tag from '../tag-constructor/Tag';
import DiscProperties from '../tag-constructor/DiscProperties';
import Header from '../Header';
import Footer from '../Footer';
import AppBody from '../AppBody';
import Button from '../Button';
import { useHistory } from 'react-router-dom';

export default function TagConstructor() {
  let history = useHistory();

  const heights = {
    header: 21,
    appBody: 73,
    footer: 6,
  };

  const [typedName, setTypedName] = useState('');
  const handleNameInput = (newName) => {
    setTypedName(newName);
  };

  const [fontFamily, setFontFamily] = useState('serif');
  const handleFontInput = (newFont) => {
    setFontFamily(newFont);
  };

  const [startPosition, setStartPosition] = useState(0);
  const handleStartInput = (newPosition) => {
    setStartPosition(newPosition);
  };

  const [spaceBetween, setSpaceBetween] = useState(0);
  const handleSpaceInput = (newValue) => {
    setSpaceBetween(newValue);
  };

  return (
    <>
      <Header style={{ height: `${heights.header}vh` }}>
        <Button onClick={() => {}} icon={'history'} text={''} />
        <Button
          onClick={() => history.push('/')}
          icon={'navigate_before'}
          text={''}
        />
      </Header>
      <AppBody style={{ height: `${heights.appBody}vh` }}>
        <Tag
          typedName={typedName}
          fontFamily={fontFamily}
          spaceBetween={spaceBetween}
          startPosition={startPosition}
        />
        <DiscProperties
          onTypedName={handleNameInput}
          onFontSelected={handleFontInput}
          onPositionSelected={handleStartInput}
          onSpaceSelected={handleSpaceInput}
        />
      </AppBody>
      <Footer style={{ height: `${heights.footer}vh` }} />
    </>
  );
}

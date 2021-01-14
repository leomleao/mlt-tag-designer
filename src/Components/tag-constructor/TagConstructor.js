import React, { useState } from 'react';
import Tag from './Tag';
import StateViewer from './StateViewer';
import DiscProperties from './DiscProperties';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import AppBody from '../AppBody';

export default function TagConstructor() {
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
      <Header />
      <AppBody>
        <Tag
          className="App-logo"
          typedName={typedName}
          fontFamily={fontFamily}
          spaceBetween={spaceBetween}
          startPosition={startPosition}
        />
        <StateViewer
          typedName={typedName}
          fontFamily={fontFamily}
          spaceBetween={spaceBetween}
          startPosition={startPosition}
        />
        <DiscProperties
          onFontSelected={handleFontInput}
          onTypedName={handleNameInput}
          onPositionSelected={handleStartInput}
          onSpaceSelected={handleSpaceInput}
        />
      </AppBody>
      <Footer />
    </>
  );
}

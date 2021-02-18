import React from 'react';
import Button from './Button';

export default function TagDisplay() {
  const TAGS = [
    {
      description: 'Tag red and white',
      src: 'Noah Stewart v13 v1 redWhite.png',
    },
    {
      description: 'Tag yellow and blue',
      src: 'Noah Stewart v13 v1 yellowBlue.png',
    },
  ];
  const [selectedTagIndex, setSelectedTagIndex] = React.useState(0);

  return (
    <div style={styles.divFlexRow}>
      <Button
        onClick={() => setSelectedTagIndex(1)}
        icon={'keyboard_arrow_left'}
        text={''}
      />
      <img
        style={{ margin: 'auto', width: '20vw', maxWidth: '200px' }}
        src={TAGS[selectedTagIndex].src}
        alt={TAGS[selectedTagIndex].description}
      />
      <Button
        onClick={() => setSelectedTagIndex(0)}
        icon={'keyboard_arrow_right'}
        text={''}
      />
    </div>
  );
}

const styles = {
  divFlexRow: {
    margin: '25px',
    minWidth: '270px',
    maxWidth: '520px',
    width: '36vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
};

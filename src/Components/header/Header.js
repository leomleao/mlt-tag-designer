import React from 'react';
// import { styles } from '../../styles/styles';

export default function Header(props) {
  const { title = 'MLT Tag Designer', subtitle } = props;
  return (
    <header>
      <h1 style={styles.h1heading}>{title}</h1>
      <div style={styles.lineStyle}></div>
      {subtitle && <h3 style={styles.h3heading}>{subtitle}</h3>}
    </header>
  );
}

const styles = {
  h1heading: {
    margin: '0.4em',
    fontWeight: '500',
  },
  h3heading: {
    margin: '0.4em',
    fontWeight: '600',
  },
  lineStyle: {
    minWidth: '300px',
    maxWidth: '600px',
    width: '40vw',
    height: '2px',
    backgroundColor: '#e5e8ea',
  },
};

import React from 'react';
// import { styles } from '../../styles/styles';

export default function Header(props) {
  const { title = 'MLT Tag Designer', subtitle = '', children } = props;
  const { h1heading, lineStyle, h3heading } = styles;
  return (
    <header style={styles.header}>
      <div style={styles.divFlexRow}>{children}</div>
      <div style={styles.divFlexColumn}>
        <h1 style={h1heading}>{title}</h1>
        <div style={lineStyle}></div>
        {subtitle && <h3 style={h3heading}>{subtitle}</h3>}
      </div>
    </header>
  );
}

const styles = {
  divFlexColumn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  divFlexRow: {
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    height: '17vh',
    marginTop: '3vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#520369',
    fontFamily: "'Quicksand', sans-serif",
  },
  h1heading: {
    margin: '0.4em',
    fontWeight: '500',
    fontSize: 'calc(25px + 2vmin)',
  },
  h3heading: {
    margin: '0.4em',
    fontWeight: '600',
    fontSize: 'calc(13px + 2vmin)',
  },
  lineStyle: {
    minWidth: '300px',
    maxWidth: '600px',
    width: '40vw',
    height: '2px',
    backgroundColor: '#e5e8ea',
  },
};

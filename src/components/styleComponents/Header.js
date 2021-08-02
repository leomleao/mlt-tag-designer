import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/styles';

export default function Header({
  title = 'M.L.T. Designs',
  subtitle = '',
  children,
}) {
  const { divFlexColumn, divFlexRow, header, h1heading, h3heading } =
    localStyles;
  return (
    <header style={header}>
      <div style={divFlexRow}>{children}</div>
      <div style={divFlexColumn}>
        <h1 style={h1heading}>{title}</h1>
        <div style={styles.lineStyle}></div>
        {subtitle && <h3 style={h3heading}>{subtitle}</h3>}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

const localStyles = {
  divFlexColumn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  divFlexRow: {
    minWidth: '270px',
    maxWidth: '450px',
    width: '80%',
    height: '2vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'row-reverse',
  },
  header: {
    flex: '0 0 auto',
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#520369',
    fontFamily: "'Quicksand', sans-serif",
  },
  h1heading: {
    margin: '0.4em',
    fontWeight: '550',
    fontSize: 'calc(25px + 2vmin)',
  },
  h3heading: {
    margin: '0.4em',
    fontWeight: '450',
    fontSize: 'calc(13px + 1.8vmin)',
  },
};

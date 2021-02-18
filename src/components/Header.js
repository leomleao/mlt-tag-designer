import React from 'react';
import PropTypes from 'prop-types';

export default function Header({
  title = 'M.L.T. Designs',
  subtitle = '',
  children,
  style,
}) {
  const headerHeight = parseInt(style.height.slice(0, -2), 10);
  const { h1heading, lineStyle, h3heading } = styles;
  return (
    <header
      style={{
        height: `${headerHeight * 0.8}vh`,
        marginTop: `${headerHeight * 0.2}vh`,
        ...styles.header,
      }}
    >
      <div style={styles.divFlexRow}>{children}</div>
      <div style={styles.divFlexColumn}>
        <h1 style={h1heading}>{title}</h1>
        <div style={lineStyle}></div>
        {subtitle && <h3 style={h3heading}>{subtitle}</h3>}
      </div>
    </header>
  );
}

Header.propTypes = {
  headerHeight: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

const styles = {
  divFlexColumn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  divFlexRow: {
    minWidth: '270px',
    maxWidth: '520px',
    width: '36vw',
    height: '2vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'row-reverse',
  },
  header: {
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
    fontWeight: '450',
    fontSize: 'calc(13px + 1.8vmin)',
  },
  lineStyle: {
    minWidth: '300px',
    maxWidth: '600px',
    width: '40vw',
    height: '2px',
    backgroundColor: '#e5e8ea',
  },
};

import React from 'react';
import PropTypes from 'prop-types';

export default function Footer({ children, style = {} }) {
  return (
    <footer style={{ ...style, ...styles.footer }}>
      <div style={styles.divFlexColumn}>{children}</div>
      <div style={styles.divFlexRow}>
        <img
          src={'logo.svg'}
          alt={''}
          style={{ height: '25px', marginRight: '5px' }}
        />
        <span style={{ fontWeight: 'bolder' }}>M.L.T. Designs</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#e5e8ea',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: "'Quicksand', sans-serif",
  },
  divFlexColumn: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexFlow: 'column wrap',
  },
  divFlexRow: {
    padding: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
};

Footer.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};

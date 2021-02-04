import React from 'react';

export default function Footer({ children }) {
  return (
    <footer style={styles.footer}>
      <div>{children}</div>
      <div>
        <img src={'logo.svg'} alt={''} style={{ height: '25px' }} />
        <span>MLT Tag Designer</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    height: '6vh',
    backgroundColor: '#e5e8ea',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

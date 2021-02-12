import React from 'react';
import PropTypes from 'prop-types';

export default function AppBody({ appBodyHeight, children }) {
  return (
    <div style={{ height: `${appBodyHeight}vh`, ...styles.appBody }}>
      {children}
    </div>
  );
}

const styles = {
  appBody: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 'calc(10px + 2vmin)',
    color: 'rgb(241, 226, 13)',
  },
};

AppBody.propTypes = {
  appBodyHeight: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

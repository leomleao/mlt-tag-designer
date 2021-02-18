import React from 'react';
import PropTypes from 'prop-types';

export default function AppBody({ style = {}, children }) {
  return <div style={{ ...style, ...styles.appBody }}>{children}</div>;
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
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

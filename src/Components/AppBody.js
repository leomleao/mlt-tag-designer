import React from 'react';

export default function AppBody(props) {
  return <div style={styles.appBody}>{props.children}</div>;
}

const styles = {
  appBody: {
    height: '74vh',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 'calc(10px + 2vmin)',
    color: 'rgb(241, 226, 13)',
  },
};

// Libs
import React from 'react';

// Misc
import PropTypes from 'prop-types';

// Styles
import styles from '../../styles/styles';

export default function LoadingComponent({ height }) {
  return (
    <div style={{ height: height, display: 'flex' }}>
      <img style={styles.loadingGif} src={'../loading.gif'} alt="loading..." />
    </div>
  );
}

LoadingComponent.propTypes = {
  height: PropTypes.string.isRequired,
};

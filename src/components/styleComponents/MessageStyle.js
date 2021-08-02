import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from '../../styles/styles';

function MessageStyle({ children }) {
  return (
    <div style={{ ...styles.modalFlexColumn, alignItems: 'center' }}>
      <div style={{ justifySelf: 'center', color: '#37474f' }}>
        <p>{children}</p>
      </div>
    </div>
  );
}

MessageStyle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MessageStyle;

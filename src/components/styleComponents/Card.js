import React from 'react';
import styles from '../../styles/styles';

export default function Card({ children }) {
  return <div style={styles.card}>{children}</div>;
}

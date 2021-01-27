import React from 'react';
// import { styles } from '../../styles/styles';

export default function Header(props) {
  const { title = 'MLT Tag Designer', subtitle } = props;
  const { h1heading, lineStyle, h3heading } = styles;
  return (
    <header>
      <h1 style={h1heading}>{title}</h1>
      <div style={lineStyle}></div>
      {subtitle && <h3 style={h3heading}>{subtitle}</h3>}
    </header>
  );
}

const styles = {
  h1heading: {
    margin: '0.4em',
    fontWeight: '500',
    fontSize: 'calc(22px + 3vmin)',
  },
  h3heading: {
    margin: '0.4em',
    fontWeight: '600',
    fontSize: 'calc(13px + 2vmin)',
  },
  lineStyle: {
    minWidth: '300px',
    maxWidth: '600px',
    width: '40vw',
    height: '2px',
    backgroundColor: '#e5e8ea',
  },
};

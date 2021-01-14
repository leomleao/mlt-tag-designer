import React from 'react';

export default function StateViewer(props) {
  const { typedName, fontFamily, spaceBetween, startPosition } = props;
  return (
    <div className="table">
      <ul>
        <li>{typedName}</li>
        <li>{fontFamily}</li>
        <li>{spaceBetween}</li>
        <li>{startPosition}</li>
      </ul>
    </div>
  );
}

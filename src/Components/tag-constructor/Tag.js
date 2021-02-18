import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../helpers/fillTextCircle.js';

const getPixelRatio = (context) => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};

export default function Tag(props) {
  const { typedName, fontFamily, spaceBetween } = props;
  let startPosition = 0;

  if (props.startPosition) {
    startPosition = props.startPosition;
  }

  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    // set width and height
    // const ratio = getPixelRatio(ctx);
    const ratio = 1;
    const width = getComputedStyle(canvas)
      .getPropertyValue('width')
      .slice(0, -2);
    const height = getComputedStyle(canvas)
      .getPropertyValue('height')
      .slice(0, -2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // setting params
    const radius = 40;
    const fontSize = 45;

    ctx.font = `bold ${fontSize}px ${fontFamily}`;

    const rotationDone = ctx.fillTextCircle(
      typedName,
      width / 2,
      height / 2,
      radius,
      startPosition,
      parseFloat(spaceBetween)
    );

    if (rotationDone > 330) {
      console.log('more than i can take');
    }

    // var dataURL = canvas.toDataURL();
    // console.log(`${dataURL}`);
    // let imageData = ctx.getImageData(0, 0, 200, 200);
    // console.log(JSON.stringify(imageData));
  });

  // JSX canvas Element with the '2d' draw
  return <canvas ref={ref} style={{ width: '200px', height: '200px' }} />;
}

Tag.propTypes = {
  typedName: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  spaceBetween: PropTypes.number.isRequired,
  startPosition: PropTypes.number,
};

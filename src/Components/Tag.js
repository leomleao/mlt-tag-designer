import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import './fillTextCircle.js';

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

/**
 *
 * @param {*} props
 * @param {string} props.typedName - Typed name
 * @param {string} props.fontFamily - []
 * @param {string} props.spaceBetween - between 0 and 10 step 0.1
 * @param {string} props.startPosition - between 0 and 360
 *
 */
const Tag = (props) => {
  const { typedName, fontFamily, spaceBetween, startPosition } = props;
  const ref = useRef();

  useEffect(() => {
    // reference to the canvas Element:
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    // set width and height
    const ratio = getPixelRatio(ctx);
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
    let fontSize = 45;
    let rotationDone = 0;

    do {
      ctx.font = `bold ${fontSize}px ${fontFamily}`;

      ctx.resetTransform();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rotationDone = ctx.fillTextCircle(
        typedName,
        width / 2,
        height / 2,
        radius,
        parseInt(startPosition, 10),
        parseFloat(spaceBetween)
      );
      fontSize -= 1;

      if (fontSize < 30) {
        console.log('Font Size bellow 30');
        break;
      }
    } while (rotationDone > 330);

    // var dataURL = canvas.toDataURL();
    // console.log(`Data is: ${dataURL}`);
    // let imageData = ctx.getImageData(0, 0, 200, 200);
    // console.log(JSON.stringify(imageData));
  });

  // JSX canvas Element with the '2d' draw
  return <canvas ref={ref} style={{ width: '200px', height: '200px' }} />;
};

export default Tag;

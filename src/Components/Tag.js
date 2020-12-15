import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
/**
 *
 * @param {string} text - The name provided from input
 * @param {number} x - x position in the canvas
 * @param {number} y - y position in the canvas
 * @param {number} radius - circle radius
 * @param {number} startRotation - startRotations
 */
CanvasRenderingContext2D.prototype.fillTextCircle = function (
  text,
  x,
  y,
  radius,
  startRotation
) {
  startRotation = startRotation / 55 + 3.8;
  const numDegreesPerLetter = (2 * Math.PI) / text.length;

  console.log(text, x, y, radius, startRotation);

  this.save();
  this.translate(x, y);
  this.rotate(startRotation);

  for (var i = 0; i < text.length; i++) {
    this.save();
    this.translate(radius, 0);
    //      if (i == 0) {
    //          this.fillStyle = 'red';
    this.translate(10, -10);
    //          this.fillRect(0,0,4,4);
    this.rotate(1.4);
    this.translate(-10, 10);
    //          this.fillStyle = 'black';
    //      }

    //      this.fillRect(0,0,4,4);
    this.fillText(text[i], 0, 0);
    this.restore();
    this.rotate(numDegreesPerLetter);
  }
  this.restore();
};

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
 * @param {number} props.spaceBetween - between 0 and 10 step 0.1
 * @param {number} props.startPosition - between 0 and 360
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

    console.log(spaceBetween, startPosition);
    // set font style
    const fontSize = 30;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillTextCircle(typedName, width / 2, height / 2, 40, startPosition);
  });

  // JSX canvas Element to render the '2d' draw
  return <canvas ref={ref} style={{ width: '200px', height: '200px' }} />;
};

export default Tag;

import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
/**
 *
 * @param {string} text - The name provided from input
 * @param {number} x - x position in the canvas
 * @param {number} y - y position in the canvas
 * @param {number} radius - circle radius
 * @param {number} startRotation - startRotations in degrees
 * @param {number} spacing - between 0 and 10 step 0.1
 */
CanvasRenderingContext2D.prototype.fillTextCircle = function (
  text,
  x,
  y,
  radius,
  startRotation,
  spacing
) {
  // (π = perímetro / diâmetro)

  // spancing without the spacing variable (lenght increment is to add a space)
  const maxRadiansPerLetter = degreesInRadians(360 / (text.length + 1));

  // move the origin to the canvas center
  this.translate(x, y);

  // rotate to match the startRotation
  this.rotate(degreesInRadians(startRotation));

  // interact whith each character in the name provided from input and print
  for (let i = 0; i < text.length; i++) {
    // measure actual text width
    const charWidth = this.measureText(text[i]).width;
    let nextCharWidth = null;
    // measure next text width, if exists
    if (i + 1 < text.length)
      nextCharWidth = this.measureText(text[i + 1]).width;

    // print character centered in the x axis and moved radius value in the y axis
    this.fillText(text[i], -charWidth / 2, -radius);

    const radiansToRotate = radiansForLetters(charWidth, nextCharWidth);

    // rotate for the next character
    this.rotate(radiansToRotate);
  }

  function radiansForLetters(charWidth, nextCharWidth) {
    if (!nextCharWidth) {
      return 0;
    }
    // minimal spacing
    const lettersSpacing = charWidth / 2.5 + nextCharWidth / 2.5;
    // sen = cat oposto/hipotenusa
    const minRadiansPerLetter = Math.asin(lettersSpacing / radius);

    /**
     * create a spacing variable:
     * @param {number} spacing - Max spacing when spacing == 1
     *                         - Min spacing when spacing == 0
     */
    const calculatedSpacing =
      (maxRadiansPerLetter - minRadiansPerLetter) * spacing;

    // add the spacing variable to the min
    const numRadiansPerLetter = minRadiansPerLetter + calculatedSpacing;

    return numRadiansPerLetter;
  }
};

/**
 *
 * @param {number} charWidth - between 8 and 30
 * @param {number} nextCharWidth - between 8 and 30
 * @returns {number} - in radians
 */

/**
 *
 * @param {number} degree
 */
const degreesInRadians = (degree) => (degree * Math.PI) / 180;

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

    // set font style
    const fontSize = 30;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillTextCircle(
      typedName,
      width / 2,
      height / 2,
      30,
      startPosition,
      spaceBetween
    );
  });

  // JSX canvas Element with the '2d' draw
  return <canvas ref={ref} style={{ width: '200px', height: '200px' }} />;
};

export default Tag;

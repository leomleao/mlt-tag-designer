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
 * @returns {number} rotationDone in degress
 */
CanvasRenderingContext2D.prototype.fillTextCircle = function (
  text,
  x,
  y,
  radius,
  startRotation,
  spacing
) {
  //dynamic spacing

  // (π = perímetro / diâmetro)

  // spancing without the spacing variable (lenght increment is to add a space)
  const maxRadiansPerLetter = degreesInRadians(360 / (text.length + 1));

  // move the origin to the canvas center
  this.translate(x, y);

  // rotate to match the startRotation
  this.rotate(degreesInRadians(startRotation));

  let rotationDone = 0;

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

    // incremente the ratation
    rotationDone += radiansToRotate;
    // end of fot interaction
  }

  return (rotationDone * 180) / Math.PI;
  // end of funtion fillTextCircle

  /**
   * this functio is here because use the local function scope
   * @param {number} spacing - the local scope
   *
   * @param {number} charWidth
   * @param {number} nextCharWidth - Optional
   * @returns {number} - in radians
   */
  function radiansForLetters(charWidth, nextCharWidth) {
    let lettersSpacing;

    // minimal spacing
    if (nextCharWidth) {
      lettersSpacing = charWidth / 2.5 + nextCharWidth / 2.5;
    } else {
      lettersSpacing = charWidth * 0.8;
    }
    // sen = cat oposto/hipotenusa
    const minRadiansPerLetter = Math.asin(lettersSpacing / radius);

    /**
     * create a spacing variable:
     * @param {number} spacing - Max spacing when spacing == 1
     *                         - Min spacing when spacing == 0
     */
    const calculatedSpacing =
      (maxRadiansPerLetter - minRadiansPerLetter) * spacing;
    // console.log(`max: ${maxRadiansPerLetter}`);
    // console.log(`min: ${minRadiansPerLetter}`);
    // add the spacing variable to the min
    let numRadiansPerLetter = minRadiansPerLetter;
    if (calculatedSpacing > 0)
      numRadiansPerLetter = minRadiansPerLetter + calculatedSpacing;
    return numRadiansPerLetter;
    //end of function radiansForLetters
  }
};

/**
 * 6,2831853071640004771 rad = 360 deg
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

    // setting params
    const radius = 30;
    let fontSize = 35;
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
        startPosition,
        spaceBetween
      );
      fontSize -= 1;

      if (fontSize < 25) {
        console.log('more then 350');
        break;
      }
    } while (rotationDone > 360);

    // var dataURL = canvas.toDataURL();
    // console.log(`Data is: ${dataURL}`);
    // let imageData = ctx.getImageData(0, 0, 200, 200);
    // console.log(JSON.stringify(imageData));
  });

  // JSX canvas Element with the '2d' draw
  return <canvas ref={ref} style={{ width: '200px', height: '200px' }} />;
};

export default Tag;

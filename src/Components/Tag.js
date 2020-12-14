import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
/**
 *
 * @param {string} text - The name provided from input
 * @param {number} x - x
 * @param {number} y - y
 * @param {number} radius - radius
 * @param {number} startRotation - startRotations
 */
CanvasRenderingContext2D.prototype.fillTextCircle = function (
  text,
  x,
  y,
  radius,
  startRotation
) {
  var numDegreesPerLetter = (2 * Math.PI) / text.length;
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

const Tag = (props) => {
  let ref = useRef();

  useEffect(() => {
    let canvas = ref.current;
    let ctx = canvas.getContext('2d');

    let ratio = getPixelRatio(ctx);
    let width = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    let height = getComputedStyle(canvas)
      .getPropertyValue('height')
      .slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.font = 'bold 30px Serif';
    ctx.fillTextCircle(props.name, 50, 50, 25, Math.PI / 2);
  });
  return <canvas ref={ref} style={{ width: '160px', height: '160px' }} />;
};

export default Tag;

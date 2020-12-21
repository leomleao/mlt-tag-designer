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
  // (π = perímetro / diâmetro)

  // move the origin to the canvas center
  this.translate(x, y);

  this.lineWidth = 4;
  this.beginPath();

  // rotate to match the startRotation
  this.rotate(degreesInRadians(startRotation + 90));

  /**
   * reference drawing:
   */
  this.arc(0, 0, radius / 2, 0, degreesInRadians(360));
  this.arc(0, 0, radius / 2, 0, degreesInRadians(30), true);
  this.arc(0, 0, radius * 2, 0, 2 * Math.PI);
  this.stroke();

  this.rotate(degreesInRadians(-100));

  let rotationDone = 0;
  const spacingLeft = 300 - this.measureText(text).width;
  const aditionalRadians = radiansForLetters(spacingLeft / text.length, radius);
  console.log(aditionalRadians);
  // interact whith each character in the name provided from input and print
  for (let i = 0; i < text.length; i++) {
    // measure actual text width
    const charWidth = this.measureText(text[i]).width;

    let radiansToRotate = radiansForLetters(charWidth, radius);

    if (aditionalRadians > 0) {
      radiansToRotate = radiansToRotate + aditionalRadians * spacing;
    }
    // rotate half actual char width
    this.rotate(radiansToRotate * -0.5);

    // print character centered in the x axis and moved radius value in the y axis
    this.fillText(text[i], -charWidth / 2, radius * 1.6);

    // reotate another half
    this.rotate(radiansToRotate * -0.5);

    // incremente the ratation
    rotationDone += radiansToRotate;
  }
  // end of fot interaction

  //   // this.translate(charWidth, 0);

  // }

  // return (rotationDone * 180) / Math.PI;
  // // end of funtion fillTextCircle

  // /**
  //  * this functio is here because use the local function scope
  //  * @param {number} spacing - the local scope
  //  *
  //  * @param {number} charWidth
  //  * @param {number} nextCharWidth - Optional
  //  * @returns {number} - in radians
  //  */
  // function radiansForLetters(charWidth, nextCharWidth) {
  //   let lettersSpacing;

  //   // minimal spacing
  //   if (nextCharWidth) {
  //     lettersSpacing = charWidth / 2.5 + nextCharWidth / 2.5;
  //   } else {
  //     lettersSpacing = charWidth * 0.8;
  //   }
  //   // sen = cat oposto/hipotenusa
  //   const minRadiansPerLetter = Math.asin(lettersSpacing / radius);

  //   /**
  //    * create a spacing variable:
  //    * @param {number} spacing - Max spacing when spacing == 1
  //    *                         - Min spacing when spacing == 0
  //    */
  //   const calculatedSpacing =
  //     (maxRadiansPerLetter - minRadiansPerLetter) * spacing;
  //   // console.log(`max: ${maxRadiansPerLetter}`);
  //   // console.log(`min: ${minRadiansPerLetter}`);
  //   // add the spacing variable to the min
  //   let numRadiansPerLetter = minRadiansPerLetter;
  //   if (calculatedSpacing > 0)
  //     numRadiansPerLetter = minRadiansPerLetter + calculatedSpacing;
  //   return numRadiansPerLetter;
  //   //end of function radiansForLetters
  // }
};

/**
 * 6,2831853071640004771 rad = 360 deg
 * @param {number} degree
 */
const degreesInRadians = (degree) => (degree * Math.PI) / 180;

/**
 * seno a = cateto oposto/hipotenusa
 * @param {number} charWidth
 * @param {number} radius
 * @returns {number} radiansToRotate
 */
const radiansForLetters = (charWidth, radius) => {
  const letterSpacing = Math.asin((charWidth * 0.5) / radius) * 2;
  return letterSpacing * 0.75;
};

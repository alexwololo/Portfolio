document.addEventListener('DOMContentLoaded', function () {
  const colorInput = document.getElementById('colorInput');
  const colorPalette = document.getElementById('colorPalette');

  // Add color boxes to the palette
  function addColorToPalette(color) {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;

    colorBox.addEventListener('click', function () {
      colorInput.value = rgbToHex(color);
    });

    colorPalette.appendChild(colorBox);
  }

  function rgbToHex(rgb) {
    const rgbValues = rgb.substring(4, rgb.length - 1).split(', ');

    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);

    // Convert each value to hex string
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    // Combine the hex strings to hex color code
    const hexColor = '#' + hexR + hexG + hexB;

    return hexColor;
  }

  // Update the palette with new selected color
  colorInput.addEventListener('input', function () {
    addColorToPalette(this.value);
  });
});

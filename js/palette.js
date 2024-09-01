document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('colorCanvas');
  const context = canvas.getContext('2d');
  const colorPalette = document.getElementById('colorPalette');

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawColorPicker();
  }

  function drawColorPicker() {
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.15, 'orange');
    gradient.addColorStop(0.33, 'yellow');
    gradient.addColorStop(0.49, 'green');
    gradient.addColorStop(0.67, 'cyan');
    gradient.addColorStop(0.84, 'blue');
    gradient.addColorStop(1, 'magenta');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const whiteGradient = context.createLinearGradient(0, 0, 0, canvas.height);
    whiteGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    whiteGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    whiteGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    whiteGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    context.fillStyle = whiteGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  canvas.addEventListener('click', function (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const imageData = context.getImageData(x, y, 1, 1).data;
    const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
    addColorToPalette(color);
    changeBackgroundColor(color); // Ändrar bakgrundsfärgen
  });

  function addColorToPalette(color) {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;

    colorBox.addEventListener('click', function () {
      console.log('Selected color: ' + rgbToHex(color));
      changeBackgroundColor(color); // Ändrar bakgrundsfärgen vid klick på färg i paletten
    });

    colorPalette.appendChild(colorBox);
  }

  function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color; // Ändrar bakgrundsfärgen
  }

  function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);

    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);

    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    return `#${hexR}${hexG}${hexB}`;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
});

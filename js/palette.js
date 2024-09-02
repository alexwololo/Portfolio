document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('colorCanvas');
  const context = canvas.getContext('2d');
  const colorPalette = document.getElementById('colorPalette');
  let isMouseDown = false;

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

  function pickColor(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const imageData = context.getImageData(x, y, 1, 1).data;
    const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
    changeBackgroundColor(color);
  }

  function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }

  canvas.addEventListener('mousedown', function () {
    isMouseDown = true;
  });

  canvas.addEventListener('mouseup', function () {
    isMouseDown = false;
  });

  canvas.addEventListener('mousemove', function (event) {
    if (isMouseDown) {
      pickColor(event);
    }
  });

  canvas.addEventListener('click', function (event) {
    pickColor(event);
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
});

const text = ' JS CSS';
let index = 0;

function typeWriter() {
  document.getElementById('typewriter').innerHTML = text.substring(0, index);
  index++;
  if (index <= text.length) {
    setTimeout(typeWriter, 100);
  }
}

typeWriter();

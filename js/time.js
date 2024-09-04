function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const hourTensFront = document.querySelector('#hour-tens .flip-front');
  const hourTensBack = document.querySelector('#hour-tens .flip-back');
  if (hourTensFront.textContent !== hours[0]) {
    hourTensBack.textContent = hours[0];
    document.getElementById('hour-tens').style.transform = 'rotateX(-90deg)';
    setTimeout(() => {
      hourTensFront.textContent = hours[0];
      document.getElementById('hour-tens').style.transform = 'rotateX(0deg)';
    }, 400);
  }

  const hourOnesFront = document.querySelector('#hour-ones .flip-front');
  const hourOnesBack = document.querySelector('#hour-ones .flip-back');
  if (hourOnesFront.textContent !== hours[1]) {
    hourOnesBack.textContent = hours[1];
    document.getElementById('hour-ones').style.transform = 'rotateX(-90deg)';
    setTimeout(() => {
      hourOnesFront.textContent = hours[1];
      document.getElementById('hour-ones').style.transform = 'rotateX(0deg)';
    }, 400);
  }

  const minuteTensFront = document.querySelector('#minute-tens .flip-front');
  const minuteTensBack = document.querySelector('#minute-tens .flip-back');
  if (minuteTensFront.textContent !== minutes[0]) {
    minuteTensBack.textContent = minutes[0];
    document.getElementById('minute-tens').style.transform = 'rotateX(-90deg)';
    setTimeout(() => {
      minuteTensFront.textContent = minutes[0];
      document.getElementById('minute-tens').style.transform = 'rotateX(0deg)';
    }, 400);
  }

  const minuteOnesFront = document.querySelector('#minute-ones .flip-front');
  const minuteOnesBack = document.querySelector('#minute-ones .flip-back');
  if (minuteOnesFront.textContent !== minutes[1]) {
    minuteOnesBack.textContent = minutes[1];
    document.getElementById('minute-ones').style.transform = 'rotateX(-90deg)';
    setTimeout(() => {
      minuteOnesFront.textContent = minutes[1];
      document.getElementById('minute-ones').style.transform = 'rotateX(0deg)';
    }, 400);
  }

  const secondTensFront = document.querySelector('#second-tens .flip-front');
  const secondTensBack = document.querySelector('#second-tens .flip-back');
  if (secondTensFront.textContent !== seconds[0]) {
    secondTensBack.textContent = seconds[0];
    document.getElementById('second-tens').style.transform = 'rotateX(-90deg)';
    setTimeout(() => {
      secondTensFront.textContent = seconds[0];
      document.getElementById('second-tens').style.transform = 'rotateX(0deg)';
    }, 400);
  }

  const secondOnesFront = document.querySelector('#second-ones .flip-front');
  const secondOnesBack = document.querySelector('#second-ones .flip-back');
  if (secondOnesFront.textContent !== seconds[1]) {
    secondOnesBack.textContent = seconds[1];
    document.getElementById('second-ones').style.transform = 'rotateX(-90deg)';
    setTimeout(() => {
      secondOnesFront.textContent = seconds[1];
      document.getElementById('second-ones').style.transform = 'rotateX(0deg)';
    }, 400);
  }
}

setInterval(updateClock, 1000);
updateClock();

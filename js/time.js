function showClock() {
  // Create a new Date object for the current time
  let now = new Date();

  // Get the time in sweden (CET/CEST) using toLocaleTimeString
  let options = {
    timeZone: 'Europe/Stockholm',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  let sweTime = now.toLocaleTimeString('sv-SE', options);

  // Find the HTML element id "clockDisplay" and set its text to the current time
  const clockElement = document.getElementById('clockDisplay');
  clockElement.innerText = 'Current time: ' + sweTime;
}

// Update the clock every second
setInterval(showClock, 1000);

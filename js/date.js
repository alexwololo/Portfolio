function showDate() {
  let today = new Date();
  let day = today.getDate();

  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let month = months[today.getMonth()];

  const dateElement = document.getElementById('dateDisplay');
  dateElement.innerHTML = `
    <div class="calendar">
    <div class="handles"></div>
    <div class="month">August</div>
    <div class="separator"></div>
    <div class="day">24</div>
</div>

  `;
}

showDate();

function showDate() {
  let today = new Date();
  let day = today.getDate();

  let months = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  let month = months[today.getMonth()];

  let formattedDate = day + ' ' + month;

  const dateElement = document.getElementById('dateDisplay');
  dateElement.innerText = formattedDate;
}

showDate();

function showDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1; // Add 1 because months start at 0
  let day = today.getDate();

  let formattedDate = day + '/' + month + '/' + year;

  // Find the HTML element with id "dateDisplay" and set text to the formatted date
  const dateElement = document.getElementById('dateDisplay');
  dateElement.innerText = "Today's date is: " + formattedDate;
}

// Call the function to show the date
showDate();

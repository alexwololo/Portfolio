// script.js

// Exempel: Lägg till en enkel interaktiv effekt
document.querySelectorAll('.bento-item').forEach((item) => {
  item.addEventListener('mouseover', () => {
    item.style.boxShadow = '2px 2px 20px rgba(0, 0, 0, 0.2)';
  });

  item.addEventListener('mouseout', () => {
    item.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.1)';
  });
});

// script.js (eller ny fil för datumvisning)

document.addEventListener('DOMContentLoaded', () => {
  const dateDisplay = document.getElementById('date-display');
  const today = new Date();

  // Formatera datumet som "Dagens datum: 18 augusti 2024"
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('sv-SE', options);

  // Visa datumet i bento-item
  dateDisplay.textContent = `Dagens datum: ${formattedDate}`;
});

// script.js

// Hover over item effect
document.querySelectorAll('.bento-item').forEach((item) => {
  item.addEventListener('mouseover', () => {
    item.style.boxShadow = '2px 2px 20px rgba(0, 0, 0, 0.2)';
  });

  item.addEventListener('mouseout', () => {
    item.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.1)';
  });
});

// Dark & light mode
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
});

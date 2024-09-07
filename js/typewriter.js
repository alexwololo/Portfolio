const words = ['React', 'JS', 'CSS', 'HTML'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 150;
const deleteSpeed = 75;
const delayBetweenWords = 1500;

function typeWriter() {
  const currentWord = words[wordIndex];
  const typewriterElement = document.getElementById('typewriter');

  if (isDeleting) {
    typewriterElement.innerHTML = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeWriter, typeSpeed);
    } else {
      setTimeout(typeWriter, deleteSpeed);
    }
  } else {
    typewriterElement.innerHTML = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => {
        isDeleting = true;
        setTimeout(typeWriter, deleteSpeed);
      }, delayBetweenWords);
    } else {
      setTimeout(typeWriter, typeSpeed);
    }
  }
}

typeWriter();

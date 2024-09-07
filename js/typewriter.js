const words = ['HTML', 'CSS', 'JS', 'React'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 200;
const deleteSpeed = 70;
const delayBetweenWords = 1000;

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

/*
Problem:
The code was not handling the steps (typing, waiting, deleting, and moving to the next word) in the right order. It started deleting before the word was fully typed and didn’t switch to the next word correctly.

Solution:
Clear separation between typing and deleting:

The code now waits until the word is fully typed before starting to delete.
A flag (isDeleting) is used to control whether the code is typing or deleting.
Finish deleting before switching to the next word:

Deletion continues until the whole word is removed (when charIndex reaches 0), and then the code moves to the next word.
Now, the code types out each word completely, deletes it, and then moves to the next word in the correct order.
*/

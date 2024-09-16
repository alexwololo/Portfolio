/**
 * skapa rutnät 3x3
 * ange start
 * ange mål
 * ange start
 * hinder?
 * gå upp, ned, hö, vä
 * ej kunna gå utanför spelplanen
 * motståndare rörelser
 * vinst kriterier: spelaren når mål
 * förlust kriterier: motståndaren når spelaren
 */

const gridContainer = document.getElementById('grid-container');
const gridSize = 3;
let playerX = 0;
let playerY = 0;

function createGrid() {
  gridContainer.style.display = 'grid';
  gridContainer.style.gridTemplateColumns = 'repeat(' + gridSize + ', 40px)';
  gridContainer.style.gridTemplateRows = 'repeat(' + gridSize + ', 40px)';
  gridContainer.style.gap = '5px';

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    gridContainer.appendChild(cell);
  }
  updatePlayer();
}

function updatePlayer() {
  const cells = document.querySelectorAll('.grid-item');

  cells.forEach(function (cell) {
    cell.textContent = '';
  });

  const middleX = Math.floor(gridSize / 2);
  const middleY = Math.floor(gridSize / 2);
  const playerIndex = middleY * gridSize + middleX;

  cells[playerIndex].textContent = '🧙';
}

createGrid();

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp' && playerY > 0) {
    playerY--;
  } else if (event.key === 'ArrowDown' && playerY < gridSize - 1) {
    playerY++;
  } else if (event.key === 'ArrowLeft' && playerX > 0) {
    playerX--;
  } else if (event.key === 'ArrowRight' && playerX < gridSize - 1) {
    playerX++;
  }
  updatePlayer();
});

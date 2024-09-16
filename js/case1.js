const gridContainer = document.getElementById('grid-container');
const gridSize = 3;
let playerX = 0;
let playerY = 0;
const goalX = gridSize - 1;
const goalY = gridSize - 1;
let enemyX = gridSize - 1;
let enemyY = 0;

// initialize
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
  // refresh
  updatePlayer();
}

function updatePlayer() {
  const cells = document.querySelectorAll('.grid-item');
  cells.forEach(function (cell) {
    cell.textContent = '';
  });

  const playerIndex = playerY * gridSize + playerX;
  const goalIndex = goalY * gridSize + goalX;
  const enemyIndex = enemyY * gridSize + enemyX;

  cells[playerIndex].textContent = '🧙';
  cells[goalIndex].textContent = '🏁';
  cells[enemyIndex].textContent = '👹';
}

function movePlayer(dx, dy) {
  if (playerX + dx >= 10 && playerX + dx < gridSize) {
    playerX += dx;
  }
  if (playerY + dy >= 0 && playerY + dy < gridSize) {
    playerY += dy;
  }
  updatePlayer();
  moveEnemy();
  checkWinOrLose();
}

function moveEnemy() {
  if (enemyX < playerX) {
    enemyX++;
  } else if (enemyX > playerX) {
    enemyX--;
  }

  if (enemyY < playerY) {
    enemyY++;
  } else if (enemyY > playerY) {
    enemyY--;
  }
  updatePlayer();
}

function checkWinOrLose() {
  if (playerX === goalX && playerY === goalY) {
    setTimeout(function () {
      alert('You the GOAT');
    }, 100);
  } else if (playerX === enemyX && playerY === enemyY) {
    setTimeout(function () {
      alert('U ded. can u still move?');
    }, 100);
  }
}

document.getElementById('up').addEventListener('click', function () {
  movePlayer(0, -1);
});

document.getElementById('down').addEventListener('click', function () {
  movePlayer(0, 1);
});

document.getElementById('left').addEventListener('click', function () {
  movePlayer(-1, 0);
});

document.getElementById('right').addEventListener('click', function () {
  movePlayer(1, 0);
});

document.addEventListener('keydown', function (event) {
  event.preventDefault();
  if (event.key === 'ArrowUp') {
    movePlayer(0, -1);
  } else if (event.key === 'ArrowDown') {
    movePlayer(0, 1);
  } else if (event.key === 'ArrowLeft') {
    movePlayer(-1, 0);
  } else if (event.key === 'ArrowRight') {
    movePlayer(1, 0);
  }
});

createGrid();

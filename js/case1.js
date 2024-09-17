const gridContainer = document.getElementById('grid-container');
const gridSize = 5;
let playerX = 0;
let playerY = 0;
const goalX = gridSize - 1;
const goalY = gridSize - 1;
let enemyX = gridSize - 1;
let enemyY = 0;
const obstacleX = Math.floor(gridSize / 2); // Obstacle in the middle, always in centre
const obstacleY = Math.floor(gridSize / 2);
let steps = 0; // Step counter
let gameOver = false; //prevent movements after caught

function createGrid() {
  // Create the grid and place items
  console.log('Grid is created');
  gridContainer.style.display = 'grid';
  gridContainer.style.gridTemplateColumns = 'repeat(' + gridSize + ', 40px)';
  gridContainer.style.gridTemplateRows = 'repeat(' + gridSize + ', 40px)';
  gridContainer.style.gap = '4px';

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    gridContainer.appendChild(cell);
  }
  updatePlayer();
}

function updatePlayer() {
  // Update player enemy goal and obstacle positions
  console.log('Player is at:', playerX, playerY);
  const cells = document.querySelectorAll('.grid-item');
  cells.forEach(function (cell) {
    cell.textContent = '';
  });

  const playerIndex = playerY * gridSize + playerX;
  const goalIndex = goalY * gridSize + goalX;
  const enemyIndex = enemyY * gridSize + enemyX;
  const obstacleIndex = obstacleY * gridSize + obstacleX;

  cells[playerIndex].textContent = '🧙';
  cells[goalIndex].textContent = '🏁';
  cells[enemyIndex].textContent = '👹';
  cells[obstacleIndex].textContent = '🧱';
}

// Move the player by dx, dy if within bounds
function movePlayer(dx, dy) {
  if (gameOver) return; // Stop further movements after being caught

  const newX = playerX + dx;
  const newY = playerY + dy;

  console.log('Moving to:', newX, newY);

  if (newX === obstacleX && newY === obstacleY) {
    console.log('Cannot move to obstacle');
    return; // Block movement if it is towards the obstacle
  }

  if (newX >= 0 && newX < gridSize) {
    playerX = newX;
  }
  if (newY >= 0 && newY < gridSize) {
    playerY = newY;
  }

  steps++; // Incrementstep counter
  console.log('Steps taken:', steps);

  updatePlayer();
  checkWinOrLose();
  moveEnemy(); // Move the enemy after each player move
}

function checkWinOrLose() {
  // Check if the player won or hit the enemy
  if (playerX === goalX && playerY === goalY) {
    console.log('Player won!');
    setTimeout(function () {
      alert('You won!');
    }, 100);
  } else if (playerX === enemyX && playerY === enemyY) {
    console.log('You lost!');
    gameOver = true; // Block more movements
    setTimeout(function () {
      alert('You lost!');
    }, 100);
  }
}

// Opponent movement
function moveEnemy() {
  // Move the enemy towards the player
  if (enemyX < playerX && (enemyX + 1 !== obstacleX || enemyY !== obstacleY)) {
    enemyX++;
  } else if (enemyX > playerX && (enemyX - 1 !== obstacleX || enemyY !== obstacleY)) {
    enemyX--;
  }

  if (enemyY < playerY && (enemyY + 1 !== obstacleY || enemyX !== obstacleX)) {
    enemyY++;
  } else if (enemyY > playerY && (enemyY - 1 !== obstacleY || enemyX !== obstacleX)) {
    enemyY--;
  }

  updatePlayer(); // Update grid after enemy movement
  checkWinOrLose(); // check if enemy caught player
}

document.getElementById('up').addEventListener('click', function () {
  console.log('Up button clicked');
  movePlayer(0, -1);
});

document.getElementById('down').addEventListener('click', function () {
  console.log('Down button clicked');
  movePlayer(0, 1);
});

document.getElementById('left').addEventListener('click', function () {
  console.log('Left button clicked');
  movePlayer(-1, 0);
});

document.getElementById('right').addEventListener('click', function () {
  console.log('Right button clicked');
  movePlayer(1, 0);
});

document.addEventListener('keydown', function (event) {
  // event.preventDefault(); // disables selection but also F12 and input fields
  if (gameOver) return; // Block movements with keyboard if the game is over

  if (event.key === 'ArrowUp') {
    console.log('Arrow up pressed');
    movePlayer(0, -1);
  } else if (event.key === 'ArrowDown') {
    console.log('Arrow down pressed');
    movePlayer(0, 1);
  } else if (event.key === 'ArrowLeft') {
    console.log('Arrow left pressed');
    movePlayer(-1, 0);
  } else if (event.key === 'ArrowRight') {
    console.log('Arrow right pressed');
    movePlayer(1, 0);
  }
});

createGrid();

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

function createGrid() {
  gridContainer.style.display = 'grid';
  gridContainer.style.gridTemplateColumns = 'repeat(' + gridSize + ', 60px)';
  gridContainer.style.gridTemplateRows = 'repeat(' + gridSize + ', 60px)';
  gridContainer.style.gap = '5px';

  let number = 1;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    cell.textContent = number;
    gridContainer.appendChild(cell);
    number++;
  }
}

createGrid();

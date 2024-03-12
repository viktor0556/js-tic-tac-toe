const winningCombinations = [
  [0, 1, 2], 
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll('.cell');
const paraghElement = document.querySelector('.js-cell-paragh');

let gameEnded = false;
let gameState = {
  currentTurn: 'X',
};

for (let i = 0; i < cellElements.length; i++) {
  cellElements[i].addEventListener('click', () => {
    if (!gameEnded) {
      setCellContent(cellElements[i]);
      checkWinner();
    }
  });
}

function setCellContent(cellElement) {
  if (cellElement.textContent === '') {
    cellElement.textContent = gameState.currentTurn;
    cellElement.classList.add(gameState.currentTurn.toLowerCase());
    gameState.currentTurn = gameState.currentTurn === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    if (
      cellElements[combination[0]].textContent === 'X' &&
      cellElements[combination[1]].textContent === 'X' &&
      cellElements[combination[2]].textContent === 'X'
    ) {
      paraghElement.innerHTML = '<p style="color: green;">X nyert</p>';
      gameEnded = true;
      return;
    }
    if (
      cellElements[combination[0]].textContent === 'O' &&
      cellElements[combination[1]].textContent === 'O' &&
      cellElements[combination[2]].textContent === 'O'
    ) {
      paraghElement.innerHTML = '<p style="color: green;">O nyert</p>';
      gameEnded = true;
      return;
    }
  }

  let allCellsFilled = true;
  for (let i = 0; i < cellElements.length; i++) {
    if (cellElements[i].textContent === '') {
      allCellsFilled = false;
      break;
    }
  }
  if (allCellsFilled) {
    paraghElement.innerHTML = '<p style="color: red;">Minden cella be van jelölve! Nincs Nyertes!</p>';
    gameEnded = true;
    return;
  }

  // Ha senki sem nyert még és van még szabad cella, akkor a játék folytatódik
  paraghElement.innerHTML = `<p style="color: red;">${gameState.currentTurn} Lép</p>`;
}

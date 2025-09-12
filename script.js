const cells = document.querySelectorAll("[data-cell]");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
let currentPlayer = "X";
let board = Array(9).fill("");

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function handleClick(e) {
  const cell = e.target;
  const index = [...cells].indexOf(cell);

  if (board[index] !== "" || message.textContent !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWinner(currentPlayer)) {
    message.textContent = `Player ${currentPlayer} wins!`;
    return;
  }

  if (board.every(cell => cell !== "")) {
    message.textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => board[index] === player);
  });
}

function restartGame() {
  board = Array(9).fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  message.textContent = "";
  currentPlayer = "X";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let scoreO = document.querySelector("#oscore");
let scoreX = document.querySelector("#xscore");
let noDraws = document.querySelector("#draws");

let winsO = 0;
let winsX = 0;
let draws = 0;

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnX = true;
  setTimeout(function () {
    msgContainer.classList.add("hide");
  }, 300);
  msgContainer.classList.remove("show");
  enableBoxes();
};

let turnO = true;
let turnX = false;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      box.style.color = "crimson";
      turnO = false;
      turnX = true;
    } else if (turnX) {
      box.innerHTML = "X";
      box.style.color = "white";
      turnO = true;
      turnX = false;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  if (winner == "O") {
    winsO += 1;
    scoreO.innerHTML = `O : ${winsO}`;
  } else if (winner == "X") {
    winsX += 1;
    scoreX.innerHTML = `X : ${winsX}`;
  }

  msg.innerText = `Winner is ${winner}`;

  msgContainer.classList.remove("hide");
  setTimeout(function () {
    msgContainer.classList.add("show");
  }, 300);
  disableBoxes();
};

const drawCase = () => {
  draws += 1;
  msg.innerText = `Draw!`;

  noDraws.innerHTML = `Draws : ${draws}`;

  msgContainer.classList.remove("hide");
  setTimeout(function () {
    msgContainer.classList.add("show");
  }, 500);
  disableBoxes();
};

const checkWinner = () => {
  let winnerFound = false;
  let emptyBoxes = 0;
  for (let patterns of winPatterns) {
    let pos1Val = boxes[patterns[0]].innerText;
    let pos2Val = boxes[patterns[1]].innerText;
    let pos3Val = boxes[patterns[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val == pos3Val) {
        showWinner(pos1Val);
        winnerFound = true;
        break;
      }
    }
    if (pos1Val === "" || pos2Val === "" || pos3Val === "") {
      emptyBoxes++;
    }
  }

  if (!winnerFound && emptyBoxes === 0) {
    drawCase();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let win = document.querySelector("#win");
let msg = document.querySelector("#msg");

let scoreO = document.querySelector("#oscore");
let scoreX = document.querySelector("#xscore");

let winsO = 0;
let winsX = 0;
let draws = 0;

let turnO = true;
let initialTurnO = true;

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
  setTimeout(function () {
    msgContainer.classList.add("hide");
  }, 300);
  msgContainer.classList.remove("show");
  enableBoxes();
  // Switch the starting player for the next game
  initialTurnO = !initialTurnO;
  turnO = initialTurnO;

  // Update initial styling based on the starting player
  if (turnO) {
    scoreO.style.borderBottom = "5px solid red";
    scoreX.style.borderBottom = "";
  } else {
    scoreX.style.borderBottom = "5px solid red";
    scoreO.style.borderBottom = "";
  }
};

const showWinner = (winner) => {
  if (winner == "O") {
    winsO += 1;
    scoreO.innerHTML = `O : &nbsp;&nbsp;&nbsp ${winsO}`;
  } else if (winner == "X") {
    winsX += 1;
    scoreX.innerHTML = `X : &nbsp;&nbsp;&nbsp ${winsX}`;
  }

  win.innerText = `${winner}`;
  msg.innerText = `Winner!`;

  msgContainer.classList.remove("hide");
  setTimeout(function () {
    msgContainer.classList.add("show");
  }, 300);
  disableBoxes();
};

const drawCase = () => {
  draws += 1;
  win.innerText = `XO`;
  msg.innerText = `Draw!`;

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

resetBtn.addEventListener("click", resetGame);

if (turnO) {
  scoreO.style.borderBottom = "5px solid red";
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      box.style.color = "#e5e5e5";
      scoreX.style.borderBottom = "5px solid red";
      scoreO.style.borderBottom = "";
      turnO = false;
    } else {
      box.innerHTML = "X";
      box.style.color = "#fde68a";
      scoreO.style.borderBottom = "5px solid red";
      scoreX.style.borderBottom = "";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

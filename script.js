import dfs from "/dfs.js  ";
import paint from "/paint.js";
import bfs1 from "/bfs.js";

const div = document.getElementById("tile-wrapper");
const message = document.getElementById("message");
const algo = document.getElementById("algo");
const resetButton = document.getElementById("reset");

message.innerText = "Choose a Source Tile";
let row = 30;
let col = 60;
div.style.gridTemplateColumns = `repeat(${col},27px)`;
div.style.gridTemplateRows = `repeat(${row},27px)`;

let srcFlag = false;
let src = [];
let dest = [];
let vi = [];
let arr = [];
for (let i = 1; i <= row; i++) {
  for (let j = 1; j <= col; j++) {
    let str = `r${i}c${j}`;
    const newNode = document.createElement("div");
    newNode.className = "tile";
    newNode.id = str;
    newNode.addEventListener("click", () => {
      if (srcFlag === false) {
        pickSrc(i, j);
      } else {
        pickDest(i, j);
      }
    });
    div.appendChild(newNode);
  }
}

function pickSrc(i, j) {
  message.innerText = "Choose a Destination Tile";
  srcFlag = true;
  src[0] = i - 1;
  src[1] = j - 1;
  let str = `r${i}c${j}`;
  const tile = document.getElementById(str);
  tile.style.background = "greenyellow";
}

function pickDest(i, j) {
  dest[0] = i - 1;
  dest[1] = j - 1;
  message.innerText = "Final Path";
  let str = `r${i}c${j}`;
  const tile = document.getElementById(str);
  tile.style.background = "red";
  fin();
}

function fin() {
  for (var i = 0; i < row; i++) {
    arr[i] = [];
    vi[i] = [];
    for (var j = 0; j < col; j++) {
      arr[i][j] = 0;
      vi[i][j] = false;
    }
  }

  if (algo.options[algo.selectedIndex].value === "dfs")
    dfs(arr, vi, src[0], src[1], dest, row, col);
  else bfs1(arr, vi, src[0], src[1], dest, row, col);
}

resetButton.addEventListener("click", () => {
  for (var i = 0; i < row; i++)
    for (var j = 0; j < col; j++) {
      vi[i][j] = false;
      paint(i, j, "rgba(158, 158, 158, 0.5)");
    }
  src = [];
  dest = [];
  message.innerText = "Choose a Source Tile";
  srcFlag = false;
});

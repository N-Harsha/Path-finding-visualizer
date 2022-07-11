import dfs from "/dfs.js  ";
import paint from "/paint.js";
import bfs1 from "/bfs.js";

const div = document.getElementById("tile-wrapper");
const message = document.getElementById("message");
const algo = document.getElementById("algo");
const resetButton = document.getElementById("reset");
const checkBox = document.getElementById("Maze");

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
  arr[i - 1] = [];
  vi[i - 1] = [];
  for (let j = 1; j <= col; j++) {
    let str = `r${i}c${j}`;
    const newNode = document.createElement("div");
    newNode.className = "tile";
    newNode.id = str;
    newNode.addEventListener("click", () => {
      if (srcFlag === false) {
        if (arr[i - 1][j - 1] != 1) pickSrc(i, j);
      } else {
        if (arr[i - 1][j - 1] != 1) pickDest(i, j);
      }
    });
    div.appendChild(newNode);
    arr[i - 1][j - 1] = 0;
    vi[i - 1][j - 1] = false;
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
  message.innerText = "Finding a Path...";
  let str = `r${i}c${j}`;
  const tile = document.getElementById(str);
  tile.style.background = "red";
  fin();
}

async function fin() {
  if (algo.options[algo.selectedIndex].value === "dfs") {
    if (!(await dfs(arr, vi, src[0], src[1], dest, row, col)))
      message.innerText = "Unable to find a Path";
    else message.innerText = "Found a Path";
  } else {
    if ((await bfs1(arr, vi, src[0], src[1], dest, row, col)) == false)
      message.innerText = "Unable to find a Path";
    else message.innerText = "Found a Path";
  }
}

resetButton.addEventListener("click", () => {
  clear();
  src = [];
  dest = [];
  if (checkBox.checked == true) {
    mazify();
  }
  message.innerText = "Choose a Source Tile";
  srcFlag = false;
});

checkBox.addEventListener("click", onCheckBoxClick);

async function onCheckBoxClick() {
  if (checkBox.checked == true) {
    await mazify();
  } else {
    clear();
  }
}

async function mazify() {
  let total = (row * col * 30) / 100;
  let cnt = 0;
  while (cnt < total) {
    let x = getRndInt(0, row - 1);
    let y = getRndInt(0, col - 1);
    if (arr[x][y] == 0) {
      cnt++;
      arr[x][y] = 1;
      await paint(x, y, "black", 0);
    }
  }
}

function clear() {
  for (var i = 0; i < row; i++)
    for (var j = 0; j < col; j++) {
      vi[i][j] = false;
      arr[i][j] = 0;
      paint(i, j, "rgba(158, 158, 158, 0.5)");
    }
}

function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

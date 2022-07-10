import paint from "./paint.js";
import { Queue, Node } from "./Queue.js";

let dest = [];
let row = 1;
let col = 1;
let q = null;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bfs1(arr, vi, i, j, d, r, c) {
  row = r;
  col = c;
  dest = d;
  q = new Queue();
  vi[i][j] = true;
  q.enqueue(new Node(i, j));
  await bfs(arr, vi);
  path(vi, d, i, j);
}

async function path(vi, dest, i, j) {
  let x = dest[0];
  let y = dest[1];
  while (!(x === i && y === j)) {
    let pre = vi[x][y];
    x = pre.i;
    y = pre.j;
    paint(x, y, "greenyellow");
    await sleep(10);
  }
}

async function bfs(arr, vi) {
  while (!q.isEmpty) {
    let temp = q.dequeue();
    let i = temp.x;
    let j = temp.y;

    if (j + 1 < col && vi[i][j + 1] === false) {
      vi[i][j + 1] = { i, j };
      if (check(i, j + 1)) {
        paint(i, j + 1, "red");
        break;
      }
      paint(i, j + 1, "rgb(0, 238, 255)");
      q.enqueue(new Node(i, j + 1));
    }
    if (i - 1 >= 0 && vi[i - 1][j] === false) {
      vi[i - 1][j] = { i, j };
      if (check(i - 1, j)) {
        paint(i - 1, j, "red");
        break;
      }
      paint(i - 1, j, "rgb(0, 238, 255)");
      q.enqueue(new Node(i - 1, j));
    }
    if (j - 1 >= 0 && vi[i][j - 1] === false) {
      vi[i][j - 1] = { i, j };
      if (check(i, j - 1)) {
        paint(i, j - 1, "red");
        break;
      }

      paint(i, j - 1, "rgb(0, 238, 255)");
      q.enqueue(new Node(i, j - 1));
    }
    if (i + 1 < row && vi[i + 1][j] === false) {
      vi[i + 1][j] = { i, j };
      if (check(i + 1, j)) {
        paint(i + 1, j, "red");
        break;
      }
      paint(i + 1, j, "rgb(0, 238, 255)");
      q.enqueue(new Node(i + 1, j));
    }
    await sleep(15);
  }
}

function check(i, j) {
  return i === dest[0] && j === dest[1];
}

export default bfs1;

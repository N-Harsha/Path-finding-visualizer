import paint from "./src/paint.js";
import { Queue, Node } from "/src/Queue.js";

let dest = [];
let row = 1;
let col = 1;
let q = null;

async function bfs1(arr, vi, i, j, d, r, c) {
  row = r;
  col = c;
  dest = d;
  q = new Queue();
  vi[i][j] = true;
  q.enqueue(new Node(i, j));
  let res = await bfs(arr, vi);
  await path(vi, d, i, j);
  return res;
}

async function path(vi, dest, i, j) {
  let x = dest[0];
  let y = dest[1];
  while (!(x === i && y === j) && vi[x][y] != false) {
    let pre = vi[x][y];
    x = pre.i;
    y = pre.j;
    await paint(x, y, "greenyellow", 20);
  }
}

async function bfs(arr, vi) {
  while (!q.isEmpty) {
    let temp = q.dequeue();
    let i = temp.x;
    let j = temp.y;

    if (j + 1 < col && vi[i][j + 1] === false && arr[i][j + 1] === 0) {
      vi[i][j + 1] = { i, j };
      if (check(i, j + 1)) {
        break;
      }
      await paint(i, j + 1, "rgb(0, 238, 255)", 20);
      q.enqueue(new Node(i, j + 1));
    }
    if (i - 1 >= 0 && vi[i - 1][j] === false && arr[i - 1][j] === 0) {
      vi[i - 1][j] = { i, j };
      if (check(i - 1, j)) {
        break;
      }
      await paint(i - 1, j, "rgb(0, 238, 255)", 20);
      q.enqueue(new Node(i - 1, j));
    }
    if (j - 1 >= 0 && vi[i][j - 1] === false && arr[i][j - 1] === 0) {
      vi[i][j - 1] = { i, j };
      if (check(i, j - 1)) {
        break;
      }

      await paint(i, j - 1, "rgb(0, 238, 255)", 20);
      q.enqueue(new Node(i, j - 1));
    }
    if (i + 1 < row && vi[i + 1][j] === false && arr[i + 1][j] === 0) {
      vi[i + 1][j] = { i, j };
      if (check(i + 1, j)) {
        break;
      }
      await paint(i + 1, j, "rgb(0, 238, 255)", 20);
      q.enqueue(new Node(i + 1, j));
    }
  }
  return !q.isEmpty;
}

function check(i, j) {
  return i === dest[0] && j === dest[1];
}

export default bfs1;

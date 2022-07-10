import paint from "./paint.js";

let dest = [];
let row = 1;
let col = 1;

function dfs(arr, vi, i, j, d, r, c) {
  row = r;
  col = c;
  dest = d;
  dfs1(arr, vi, i, j);
}

function dfs1(arr, vi, i, j) {
  if (i === dest[0] && j === dest[1]) {
    return true;
  }

  if (i === row && j === col) return false;

  if (i < row && j < col) {
    vi[i][j] = true;
    paint(i, j, "rgb(0, 238, 255)");
    if (i - 1 >= 0 && !vi[i - 1][j])
      if (dfs1(arr, vi, i - 1, j)) {
        paint(i, j, "greenyellow");
        // sleep(2);
        return true;
      }

    if (j + 1 < col && !vi[i][j + 1])
      if (dfs1(arr, vi, i, j + 1)) {
        paint(i, j, "greenyellow");
        // sleep(2);
        return true;
      }
    if (i + 1 < row && !vi[i + 1][j])
      if (dfs1(arr, vi, i + 1, j)) {
        paint(i, j, "greenyellow");
        // sleep(2);
        return true;
      }
  }
  if (j - 1 >= 0 && !vi[i][j - 1])
    if (dfs1(arr, vi, i, j - 1)) {
      paint(i, j, "greenyellow");
      // sleep(2);
      return true;
    }
}
export default dfs;

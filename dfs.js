import paint from "./paint.js";

let dest = [];
let src = [];
let row = 1;
let col = 1;

function dfs(arr, vi, i, j, d, r, c) {
  row = r;
  col = c;
  dest = d;
  src[0] = i;
  src[1] = j;
  dfs1(arr, vi, i, j);
}

async function dfs1(arr, vi, i, j) {
  if (i === dest[0] && j === dest[1]) {
    return true;
  }
  if (i < row && j < col) {
    vi[i][j] = true;

    await paint(i, j, "rgb(0, 238, 255)");
    if (i === src[0] && j === src[1]) paint(i, j, "greenyellow", 0);
    if (i - 1 >= 0 && !vi[i - 1][j] && arr[i - 1][j] != 1)
      if (await dfs1(arr, vi, i - 1, j)) {
        await paint(i, j, "greenyellow");

        return true;
      }

    if (j + 1 < col && !vi[i][j + 1] && arr[i][j + 1] != 1)
      if (await dfs1(arr, vi, i, j + 1)) {
        await paint(i, j, "greenyellow");

        return true;
      }
    if (i + 1 < row && !vi[i + 1][j] && arr[i + 1][j] != 1)
      if (await dfs1(arr, vi, i + 1, j)) {
        await paint(i, j, "greenyellow");

        return true;
      }
  }
  if (j - 1 >= 0 && !vi[i][j - 1] && arr[i][j - 1] != 1)
    if (await dfs1(arr, vi, i, j - 1)) {
      await paint(i, j, "greenyellow");

      return true;
    }
  return false;
}
export default dfs;

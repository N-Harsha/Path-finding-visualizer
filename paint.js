async function paint(i, j, color) {
  i++;
  j++;
  let str = `r${i}c${j}`;
  const tile = document.getElementById(str);
  tile.style.background = color;
  await sleep(20);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default paint;

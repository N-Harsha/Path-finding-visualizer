async function paint(i, j, color, speed) {
  i++;
  j++;
  let str = `r${i}c${j}`;
  const tile = document.getElementById(str);
  tile.style.background = color;
  await sleep(speed);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default paint;

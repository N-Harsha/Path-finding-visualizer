function paint(i, j, color) {
  i++;
  j++;
  let str = `r${i}c${j}`;
  const tile = document.getElementById(str);
  tile.style.background = color;
}

export default paint;

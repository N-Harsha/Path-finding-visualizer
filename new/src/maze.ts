import { DIRECTIONS, MOBILITY } from "./constants.js";
import { HTMLClassManager, generateTileID } from "./domUtils.js";
import { CoOrdArray, EdgeMatrix, VisitedArrayType } from "./index.types";

function getAvailableNodes(
  x: number,
  y: number,
  rows: number,
  columns: number,
  visitedArray: VisitedArrayType
): CoOrdArray {
  const res: CoOrdArray = [];
  for (const mob of MOBILITY) {
    const newX = x + mob[0];
    const newY = y + mob[1];
    if (
      newX >= 0 &&
      newX < rows &&
      newY >= 0 &&
      newY < columns &&
      visitedArray[newX][newY] === false
    )
      res.push([newX, newY]);
  }
  return res;
}

function removeEdge(
  x: number,
  y: number,
  newX: number,
  newY: number,
  horizontalEdges: EdgeMatrix,
  verticalEdges: EdgeMatrix
) {
  const diff = [newX - x, newY - y];
  const idx = MOBILITY.findIndex(
    (arr) => arr[0] === diff[0] && arr[1] === diff[1]
  );
  switch (DIRECTIONS[idx]) {
    case "LEFT":
      horizontalEdges[x][newY] = false;
      HTMLClassManager(x, newY, ["rightBorder"], []);
      break;
    case "TOP":
      verticalEdges[newX][y] = false;
      HTMLClassManager(newX, y, ["bottomBorder"], []);
      break;
    case "RIGHT":
      horizontalEdges[x][y] = false;
      HTMLClassManager(x, y, ["rightBorder"], []);
      break;
    case "BOTTOM":
      verticalEdges[x][y] = false;
      HTMLClassManager(x, y, ["bottomBorder"], []);
      break;
  }
}

async function mazify(
  visitedArray: VisitedArrayType,
  horizontalEdges: EdgeMatrix,
  verticalEdges: EdgeMatrix,
  rows: number,
  columns: number,
  startX: number,
  startY: number
) {
  visitedArray[startX][startY] = true;
  var availableNodes = getAvailableNodes(
    startX,
    startY,
    rows,
    columns,
    visitedArray
  );

  await HTMLClassManager(startX, startY, ["maze-pointer"], []);
  await HTMLClassManager(startX, startY, [], ["maze-pointer", "maze-visited"]);

  while (availableNodes.length > 0) {
    const randIdx = Math.floor(Math.random() * availableNodes.length);
    const [newX, newY] = availableNodes[randIdx];
    // remove the edge between the current node and the new node.
    removeEdge(startX, startY, newX, newY, horizontalEdges, verticalEdges);

    await mazify(
      visitedArray,
      horizontalEdges,
      verticalEdges,
      rows,
      columns,
      newX,
      newY
    );

    // refetch all the available nodes.
    availableNodes = getAvailableNodes(
      startX,
      startY,
      rows,
      columns,
      visitedArray
    );
  }
}

function clearArrays(
  rows: number,
  columns: number,
  visitedArray: VisitedArrayType,
  horizontalEdges: EdgeMatrix,
  verticalEdges: EdgeMatrix
) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      visitedArray[i][j] = false;
      if (j < columns - 1) {
        horizontalEdges[i][j] = true;
      }
      if (i < rows - 1) {
        verticalEdges[i][j] = true;
      }
    }
  }
}

export async function mazeController(
  maze: boolean,
  rows: number,
  columns: number,
  visitedArray: VisitedArrayType,
  horizontalEdges: EdgeMatrix,
  verticalEdges: EdgeMatrix
) {
  // this clears all the arrays every time.
  clearArrays(rows, columns, visitedArray, horizontalEdges, verticalEdges);

  // later add the check if the maze already exists.
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      const tile = document.getElementById(generateTileID(i, j));
      if (tile === null) return;
      tile.classList.add("maze", "maze-visited");
      if (i === rows - 1) tile.classList.add("bottomBorder");
      if (j === columns - 1) tile.classList.add("rightBorder");
    }
  }

  if (maze) {
    await mazify(
      visitedArray,
      horizontalEdges,
      verticalEdges,
      rows,
      columns,
      0,
      0
    );
  }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      const tile = document.getElementById(generateTileID(i, j));
      if (tile === null) return;
      if (maze) {
        visitedArray[i][j] = false;
      } else {
        tile.classList.remove(
          "maze",
          "maze-pointer",
          "maze-visited",
          "rightBorder",
          "bottomBorder"
        );
      }
    }
  }
}

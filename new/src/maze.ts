import { DIRECTIONS, MOBILITY } from "./constants.js";
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
      break;
    case "TOP":
      verticalEdges[newX][y] = false;
      break;
    case "RIGHT":
      horizontalEdges[x][y] = false;
      break;
    case "BOTTOM":
      verticalEdges[x][y] = false;
      break;
  }
}

export function mazify(
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
  while (availableNodes.length > 0) {
    const randIdx = Math.floor(Math.random() * availableNodes.length);
    const [newX, newY] = availableNodes[randIdx];
    // remove the edge between the current node and the new node.
    removeEdge(startX, startY, newX, newY, horizontalEdges, verticalEdges);

    mazify(
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

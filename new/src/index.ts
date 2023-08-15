import { DEFAULT_VALUE } from "./constants.js";
import { EdgeMatrix, VisitedArrayType } from "./index.types";
import { mazify } from "./maze.js";

const tileWrapper = document.getElementById("tile-wrapper");

var rows: number = Math.floor(
  (tileWrapper?.offsetHeight ?? DEFAULT_VALUE) / 25
);
var columns: number = Math.floor(
  (tileWrapper?.offsetWidth ?? DEFAULT_VALUE) / 25
);

var visitedArray: VisitedArrayType = new Array(rows)
  .fill([])
  .map(() => new Array(columns).fill(false));

var horizontalEdges: EdgeMatrix = new Array(rows)
  .fill([])
  .map(() => new Array(columns - 1).fill(true));

var verticalEdges: EdgeMatrix = new Array(rows - 1)
  .fill([])
  .map(() => new Array(columns).fill(true));

// mazification is initiated here.
mazify(visitedArray, horizontalEdges, verticalEdges, rows, columns, 0, 0);

if (tileWrapper) {
  // Update gridTemplateColumns and gridTemplateRows
  tileWrapper.style.gridTemplateColumns = `repeat(${columns}, 25px)`;
  tileWrapper.style.gridTemplateRows = `repeat(${rows}, 25px)`;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      // Create a new <div> element
      var tileDiv = document.createElement("div");

      // Set the class for the new <div> element
      tileDiv.classList.add("tile");
      if (i < rows - 1 && verticalEdges[i][j]) {
        tileDiv.classList.add("bottomBorder");
      }
      if (j < columns - 1 && horizontalEdges[i][j]) {
        tileDiv.classList.add("rightBorder");
      }

      // Append the new <div> element to the tileWrapper
      tileWrapper.appendChild(tileDiv);
    }
  }
}

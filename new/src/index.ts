import { clearChildren } from "./domUtils.js";
import { EdgeMatrix, VisitedArrayType } from "./index.types";
import { mazeController } from "./maze.js";

const tileWrapper: HTMLElement | null = document.getElementById("tile-wrapper");
const mazeCheckbox: HTMLInputElement | null = document.getElementById(
  "mazeFlag"
) as HTMLInputElement;

var rows: number;
var columns: number;
var visitedArray: VisitedArrayType;
var horizontalEdges: EdgeMatrix;
var verticalEdges: EdgeMatrix;

var isComputing: boolean = false;
function startComputing() {
  isComputing = true;
}

mazeCheckbox.addEventListener("click", (e: Event) => {
  const maze = (<HTMLInputElement>e.target).checked;
  mazeController(
    maze,
    rows,
    columns,
    visitedArray,
    horizontalEdges,
    verticalEdges
  );
});

// this function is to initalize the grid
function init(rows: number, columns: number) {
  if (tileWrapper === null || mazeCheckbox === null) {
    console.log("html element cannot be null");
    return;
  }
  //to clear any children before creating.
  // todo: this can be improved by using the exsiting nodes and removing the rest.
  clearChildren(tileWrapper);

  const maze: boolean = mazeCheckbox.checked;

  visitedArray = new Array(rows)
    .fill([])
    .map(() => new Array(columns).fill(false));

  horizontalEdges = new Array(rows)
    .fill([])
    .map(() => new Array(columns - 1).fill(true));

  verticalEdges = new Array(rows - 1)
    .fill([])
    .map(() => new Array(columns).fill(true));

  //adding the event listener here as i have the acess to rows and cols here.

  // Update gridTemplateColumns and gridTemplateRows
  tileWrapper.style.gridTemplateColumns = `repeat(${columns}, 25px)`;
  tileWrapper.style.gridTemplateRows = `repeat(${rows}, 25px)`;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      // Create a new <div> element
      var tileDiv = document.createElement("div");

      // Set the class for the new <div> element
      tileDiv.classList.add("tile");

      tileDiv.id = `r${i}c${j}`;
      // Append the new <div> element to the tileWrapper
      tileWrapper.appendChild(tileDiv);
    }
  }
  mazeController(
    maze,
    rows,
    columns,
    visitedArray,
    horizontalEdges,
    verticalEdges
  );
}

const observer = new ResizeObserver((entries) => {
  const box = entries[0];
  rows = Math.floor(box.contentRect.height / 25);
  columns = Math.floor(box.contentRect.width / 25);
  init(rows, columns);
});

if (tileWrapper !== null) {
  observer.observe(tileWrapper);
}

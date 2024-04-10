import { clearChildren, generateTileID } from "./domUtils.js";
import {
    EdgeMatrix,
    VisitedArrayType,
    Config,
    CoOrd,
    EnumLookUp
} from "./index.types.js";
import { clearMaze, loadMaze, mazeController } from "./maze.js";
import { BLOCK_SIZE } from "./constants.js";
import { findController } from "./finder.js";

// input elements
const tileWrapper: HTMLElement = document.getElementById("tile-wrapper")!;
const mazeCheckbox: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("mazeFlag")
);
const speedInput: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById("speed")
);
const recomputeMazeBtn = <HTMLButtonElement>(
    document.getElementById("recomputeMaze")
);
const resetBtn = <HTMLButtonElement>document.getElementById("reset");

const findAlgorithmInput = <HTMLSelectElement>(
    document.getElementById("findAlgo")
);

recomputeMazeBtn.disabled = true;
resetBtn.disabled = true;

let rows: number;
let columns: number;
let visitedArray: VisitedArrayType;
let horizontalEdges: EdgeMatrix;
let verticalEdges: EdgeMatrix;
let source: CoOrd | null = null;
let destination: CoOrd | null = null;
const initialSpeedValue = speedInput?.value;
const config: Config = {
    speed: initialSpeedValue ? parseInt(initialSpeedValue) : 10,
    isBlocked: false,
    maze: false,
    findAlgorithm: EnumLookUp[findAlgorithmInput.value]
};

const IOControl = async (callback: () => unknown) => {
    // Block UI
    mazeCheckbox.disabled = true;
    recomputeMazeBtn.disabled = true;
    resetBtn.disabled = true;
    config.isBlocked = true;
    findAlgorithmInput.disabled = true;

    // Main process
    await callback();

    // Unblock UI
    mazeCheckbox.disabled = false;
    recomputeMazeBtn.disabled = false;
    resetBtn.disabled = false;
    config.isBlocked = false;
    findAlgorithmInput.disabled = false;
};

// input events
mazeCheckbox.addEventListener("click", (e: Event) => {
    resetSrcAndDest();
    const maze = (<HTMLInputElement>e.target).checked;
    config.maze = maze;
    IOControl(() => {
        if (maze) {
            const isLoadSuccess = loadMaze(
                rows,
                columns,
                horizontalEdges,
                verticalEdges
            );
            if (isLoadSuccess) {
                return true;
            }

            return mazeController(
                rows,
                columns,
                visitedArray,
                horizontalEdges,
                verticalEdges,
                config
            );
        }
        resize();
        return clearMaze(rows, columns);
    }).then(() => {
        recomputeMazeBtn.disabled = !maze;
    });
});

speedInput.addEventListener("change", (e: Event) => {
    const value = (<HTMLInputElement>e.target).value;
    config.speed = value ? parseInt(value) : 10;
});

recomputeMazeBtn.addEventListener("click", () => {
    resetSrcAndDest();
    resize();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const tile = document.getElementById(generateTileID(i, j));
            if (i < rows - 1) {
                horizontalEdges[i][j] = true;
            }
            if (j < columns - 1) {
                verticalEdges[i][j] = true;
            }
            if (tile)
                tile.classList.remove(
                    "maze",
                    "maze-visited",
                    "maze-pointer",
                    "bottomBorder",
                    "rightBorder"
                );
        }
    }
    IOControl(() =>
        mazeController(
            rows,
            columns,
            visitedArray,
            horizontalEdges,
            verticalEdges,
            config
        )
    );
});

resetBtn.addEventListener("click", () => {
    resetSrcAndDest();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const tile = document.getElementById(generateTileID(i, j));
            if (tile === null) return;
            tile.classList.remove(
                "visited-tile",
                "source-tile",
                "destination-tile",
                "result-path"
            );
        }
    }
    resetBtn.disabled = true;
});

findAlgorithmInput.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    config.findAlgorithm = EnumLookUp[target.value];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const tile = document.getElementById(generateTileID(i, j));
            if (tile === null) return;
            tile.classList.remove("visited-tile", "result-path");
        }
    }
    IOControl(() => {
        findController(
            rows,
            columns,
            visitedArray,
            horizontalEdges,
            verticalEdges,
            source,
            destination,
            config
        );
    }).then(() => {
        recomputeMazeBtn.disabled = !config.maze;
    });
});

function resetSrcAndDest() {
    if (source !== null) {
        document
            .getElementById(generateTileID(source[0], source[1]))
            ?.classList.remove("source-tile");
        source = null;
    }
    if (destination) {
        document
            .getElementById(generateTileID(destination[0], destination[1]))
            ?.classList.remove("destination-tile");
        destination = null;
    }
}

function resize() {
    const newRows = Math.floor(tileWrapper.clientHeight / BLOCK_SIZE);
    const newColumns = Math.floor(tileWrapper.clientWidth / BLOCK_SIZE);
    if (rows == newRows && columns === newColumns) return;
    init(newRows, newColumns);
    rows = newRows;
    columns = newColumns;
}

// this function is to initialize the grid
function init(rows: number, columns: number) {
    // clear previous source and destinations
    source = null;
    destination = null;

    //to clear any children before creating.
    clearChildren(tileWrapper);

    // const maze: boolean = mazeCheckbox.checked;

    visitedArray = new Array(rows)
        .fill([])
        .map(() => new Array(columns).fill(false));

    verticalEdges = new Array(rows)
        .fill([])
        .map(() => new Array(columns - 1).fill(true));

    horizontalEdges = new Array(rows - 1)
        .fill([])
        .map(() => new Array(columns).fill(true));

    //adding the event listener here as I have the access to rows and cols here.

    // Update gridTemplateColumns and gridTemplateRows
    tileWrapper.style.gridTemplateColumns = `repeat(${columns}, ${BLOCK_SIZE}px)`;
    tileWrapper.style.gridTemplateRows = `repeat(${rows}, ${BLOCK_SIZE}px)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            // Create a new <div> element
            const tileDiv = document.createElement("div");

            // Set the class for the new <div> element
            tileDiv.classList.add("tile");
            if (i === 0) tileDiv.classList.add("topBorder");
            if (j === 0) tileDiv.classList.add("leftBorder");

            tileDiv.id = `r${i}c${j}`;

            tileDiv.onclick = () => {
                if (
                    config.isBlocked ||
                    (source !== null && destination !== null)
                )
                    return;

                if (source == null) {
                    source = [i, j];
                    tileDiv.classList.add("source-tile");
                    return;
                }
                if (source[0] === i && source[1] === j) {
                    source = null;
                    tileDiv.classList.remove("source-tile");
                    return;
                }

                destination = [i, j];
                tileDiv.classList.add("destination-tile");

                IOControl(() =>
                    findController(
                        rows,
                        columns,
                        visitedArray,
                        horizontalEdges,
                        verticalEdges,
                        source,
                        destination,
                        config
                    )
                ).then(() => {
                    resetBtn.disabled = false;
                    recomputeMazeBtn.disabled = !config.maze;
                });
            };
            // Append the new <div> element to the tileWrapper
            tileWrapper.appendChild(tileDiv);
        }
    }
}

const containsData = () => {
    const isMaze = mazeCheckbox.checked;
    const hasDataInVisitedArray = visitedArray
        ?.map((row) => row.some((rowItem) => Boolean(rowItem)))
        .some((row) => Boolean(row));
    const hasDataInHorizontalEdges = horizontalEdges
        ?.map((row) => row.some((rowItem) => !rowItem))
        .some((row) => Boolean(row));
    const hasDataInVerticalEdges = verticalEdges
        ?.map((row) => row.some((rowItem) => !rowItem))
        .some((row) => Boolean(row));
    return isMaze
        ? hasDataInVisitedArray ||
              hasDataInVerticalEdges ||
              hasDataInHorizontalEdges
        : hasDataInVisitedArray;
};

const observer = new ResizeObserver((entries) => {
    const box = entries[0];
    if (containsData()) {
        return;
    }
    rows = Math.floor(box.contentRect.height / BLOCK_SIZE);
    columns = Math.floor(box.contentRect.width / BLOCK_SIZE);
    init(rows, columns);
});

if (tileWrapper !== null) {
    observer.observe(tileWrapper);
}

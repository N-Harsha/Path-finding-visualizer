import { DIRECTIONS, MOBILITY } from "./constants.js";
import { HTMLClassManager, generateTileID } from "./domUtils.js";
import { CoOrdArray, EdgeMatrix, VisitedArrayType } from "./index.types.js";

export async function clearMaze(rows: number, columns: number) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const tile = document.getElementById(generateTileID(i, j));
            if (tile == null) continue;
            tile.classList.remove(
                "maze",
                "maze-pointer",
                "maze-visited",
                "visited-tile",
                "result-path",
                "source-tile",
                "destination-tile"
            );
        }
    }
}

// returns true if the load was a success else returns false.
export function loadMaze(
    rows: number,
    columns: number,
    horizontalEdges: EdgeMatrix,
    verticalEdges: EdgeMatrix
) {
    if (
        horizontalEdges
            .map((row) => row.every((col) => col))
            .every((val) => val) ||
        verticalEdges.map((row) => row.every((col) => col)).every((val) => val)
    ) {
        return false;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const tile = document.getElementById(generateTileID(i, j));
            if (tile === null) return false;
            tile.classList.add("maze");
            tile.classList.remove(
                "source-tile",
                "destination-tile",
                "visited-tile",
                "result-path"
            );
        }
    }
    return true;
}

export async function mazeController(
    rows: number,
    columns: number,
    visitedArray: VisitedArrayType,
    horizontalEdges: EdgeMatrix,
    verticalEdges: EdgeMatrix,
    config: { speed: number }
) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const tile = document.getElementById(generateTileID(i, j));
            if (tile === null) return;
            tile.classList.add("maze", "maze-visited");
            tile.classList.remove(
                "source-tile",
                "destination-tile",
                "visited-tile",
                "result-path"
            );
            // if (i === rows - 1) tile.classList.add("bottomBorder");
            // if (j === columns - 1) tile.classList.add("rightBorder");
        }
    }

    const [randX, randY] = [
        Math.floor(Math.random() * (rows - 1)),
        Math.floor(Math.random() * (columns - 1))
    ];

    // todo change initial values of startX and startY to be random.
    // for (let i = 0; i < 2; i += 1) {
    await mazify(
        visitedArray,
        horizontalEdges,
        verticalEdges,
        rows,
        columns,
        randX,
        randY,
        config
    );

    // reset visited array.
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const tile = document.getElementById(generateTileID(i, j));
            if (tile === null) return;
            visitedArray[i][j] = false;
        }
    }
    // }
}

async function mazify(
    visitedArray: VisitedArrayType,
    horizontalEdges: EdgeMatrix,
    verticalEdges: EdgeMatrix,
    rows: number,
    columns: number,
    startX: number,
    startY: number,
    config: { speed: number }
) {
    visitedArray[startX][startY] = true;
    let availableNodes = getAvailableNodes(
        startX,
        startY,
        rows,
        columns,
        visitedArray
    );

    await HTMLClassManager(startX, startY, ["maze-pointer"], [], config.speed);
    await HTMLClassManager(
        startX,
        startY,
        [],
        ["maze-pointer", "maze-visited"],
        config.speed
    );

    while (availableNodes.length > 0) {
        const randIdx = Math.floor(Math.random() * availableNodes.length);
        const [newX, newY] = availableNodes[randIdx];
        // remove the edge between the current node and the new node.
        removeEdge(
            startX,
            startY,
            newX,
            newY,
            horizontalEdges,
            verticalEdges,
            config
        );

        await mazify(
            visitedArray,
            horizontalEdges,
            verticalEdges,
            rows,
            columns,
            newX,
            newY,
            config
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
    verticalEdges: EdgeMatrix,
    config: { speed: number }
) {
    const diff = [newX - x, newY - y];
    const idx = MOBILITY.findIndex(
        (arr) => arr[0] === diff[0] && arr[1] === diff[1]
    );
    switch (DIRECTIONS[idx]) {
        case "LEFT":
            verticalEdges[x][newY] = false;
            HTMLClassManager(x, newY, ["rightBorder"], [], config.speed);
            break;
        case "TOP":
            horizontalEdges[newX][y] = false;
            HTMLClassManager(newX, y, ["bottomBorder"], [], config.speed);
            break;
        case "RIGHT":
            verticalEdges[x][y] = false;
            HTMLClassManager(x, y, ["rightBorder"], [], config.speed);
            break;
        case "BOTTOM":
            horizontalEdges[x][y] = false;
            HTMLClassManager(x, y, ["bottomBorder"], [], config.speed);
            break;
    }
}

import { HTMLClassManager } from "../domUtils.js";
import { CoOrd, Config, EdgeMatrix, VisitedArrayType } from "../index.types.js";

export function isMovementPossible(
    x: number,
    y: number,
    move: CoOrd,
    horizontalEdges: EdgeMatrix,
    verticalEdges: EdgeMatrix
) {
    switch (move.toString()) {
        case "0,-1": // left
            return y < 1 || !verticalEdges[x][y - 1];
        case "-1,0": // up
            return x < 1 || !horizontalEdges[x - 1][y];
        case "0,1": // right
            return !verticalEdges[x][y];
        case "1,0": // down
            return !horizontalEdges[x][y];
        default:
            return false;
    }
}

export async function paintResultPath(
    visitedArray: VisitedArrayType,
    source: CoOrd,
    destination: CoOrd,
    config: Config
) {
    let [x, y] = destination;
    while (
        !(x === source[0] && y === source[1]) &&
        visitedArray[x][y] !== false
    ) {
        if (x !== destination[0] || y !== destination[1])
            await HTMLClassManager(x, y, ["result-path"], [], config.speed);
        // todo write more defensive code here.
        [x, y] = visitedArray[x][y] as CoOrd;
    }
}

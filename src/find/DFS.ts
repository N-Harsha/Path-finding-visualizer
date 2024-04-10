import { MOBILITY } from "../constants.js";
import { HTMLClassManager } from "../domUtils.js";
import { CoOrd, Config, EdgeMatrix, VisitedArrayType } from "../index.types.js";
import { isMovementPossible } from "./utils.js";

export async function DFS(
    rows: number,
    columns: number,
    visitedArray: VisitedArrayType,
    horizontalEdges: EdgeMatrix,
    verticalEdges: EdgeMatrix,
    source: CoOrd,
    destination: CoOrd,
    config: Config,
    x: number,
    y: number
) {
    if (x === destination[0] && y === destination[1]) return true;
    const { maze } = config;
    if (x < rows && y < columns) {
        visitedArray[x][y] = true;
        // so that the source tile does not get colored.
        if (x !== source[0] || y !== source[1])
            await HTMLClassManager(x, y, ["visited-tile"], [], config.speed);

        for (let i = 0; i < MOBILITY.length; i++) {
            const move = MOBILITY[i];
            const newX = x + move[0];
            const newY = y + move[1];
            if (
                newX >= 0 &&
                newX < rows &&
                newY >= 0 &&
                newY < columns &&
                visitedArray[newX][newY] === false &&
                (!maze ||
                    isMovementPossible(
                        x,
                        y,
                        move,
                        horizontalEdges,
                        verticalEdges
                    ))
            ) {
                if (
                    await DFS(
                        rows,
                        columns,
                        visitedArray,
                        horizontalEdges,
                        verticalEdges,
                        source,
                        destination,
                        config,
                        newX,
                        newY
                    )
                ) {
                    if (x !== source[0] || y !== source[1])
                        await HTMLClassManager(
                            x,
                            y,
                            ["result-path"],
                            [],
                            config.speed
                        );
                    return true;
                }
            }
        }
    }
}

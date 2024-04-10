import { AStar } from "./find/AStar.js";
import { BFS } from "./find/BFS.js";
import { DFS } from "./find/DFS.js";

import {
    CoOrd,
    Config,
    EdgeMatrix,
    FindAlgorithm,
    VisitedArrayType
} from "./index.types.js";

export async function findController(
    rows: number,
    columns: number,
    visitedArray: VisitedArrayType,
    horizontalEdges: EdgeMatrix,
    verticalEdges: EdgeMatrix,
    source: CoOrd | null,
    destination: CoOrd | null,
    config: Config
) {
    if (source === null || destination === null) return;
    switch (config.findAlgorithm) {
        case FindAlgorithm.DFS:
            await DFS(
                rows,
                columns,
                visitedArray,
                horizontalEdges,
                verticalEdges,
                source,
                destination,
                config,
                source[0],
                source[1]
            );
            break;
        case FindAlgorithm.BFS:
            await BFS(
                rows,
                columns,
                visitedArray,
                horizontalEdges,
                verticalEdges,
                source,
                destination,
                config
            );
            break;
        case FindAlgorithm.AStar:
            await AStar(
                rows,
                columns,
                visitedArray,
                horizontalEdges,
                verticalEdges,
                source,
                destination,
                config
            );
            break;
        default:
            throw Error("find algorithm not found!!!");
    }

    // reset state;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            visitedArray[i][j] = false;
        }
    }
}

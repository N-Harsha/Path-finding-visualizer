import { Node, PriorityQueue } from "../DS/PriorityQueue.js";
import { MOBILITY } from "../constants.js";
import { HTMLClassManager } from "../domUtils.js";
import { CoOrd, Config, EdgeMatrix, VisitedArrayType } from "../index.types.js";
import { isMovementPossible, paintResultPath } from "./utils.js";

export async function AStar(
    rows: number,
    columns: number,
    visitedArray: VisitedArrayType,
    horizontalEdges: EdgeMatrix,
    verticalEdges: EdgeMatrix,
    source: CoOrd,
    destination: CoOrd,
    config: Config
) {
    function heuristic(x: number, y: number) {
        return Math.abs(x - destination[0]) + Math.abs(y - destination[1]);
    }
    function createNode(x: number, y: number) {
        return new Node(x, y, heuristic(x, y));
    }
    const queue = new PriorityQueue<Node>((a, b) => a.h < b.h);
    visitedArray[source[0]][source[1]] = true;
    queue.push(createNode(...source));

    const { maze } = config;

    while (!queue.isEmpty()) {
        const currentNode = queue.pop();
        if (currentNode === undefined) {
            break;
        }

        for (let i = 0; i < MOBILITY.length; i++) {
            const move = MOBILITY[i];
            const newX = currentNode.x + move[0];
            const newY = currentNode.y + move[1];
            if (
                newX >= 0 &&
                newX < rows &&
                newY >= 0 &&
                newY < columns &&
                visitedArray[newX][newY] === false &&
                (!maze ||
                    isMovementPossible(
                        currentNode.x,
                        currentNode.y,
                        move,
                        horizontalEdges,
                        verticalEdges
                    ))
            ) {
                if (newX === destination[0] && newY === destination[1]) {
                    visitedArray[newX][newY] = [currentNode.x, currentNode.y];
                    while (!queue.isEmpty()) {
                        queue.pop();
                    }
                    break;
                }
                if (newX !== destination[0] || newY !== destination[1])
                    await HTMLClassManager(
                        newX,
                        newY,
                        ["visited-tile"],
                        [],
                        config.speed
                    );
                visitedArray[newX][newY] = [currentNode.x, currentNode.y];
                queue.push(createNode(newX, newY));
            }
        }
    }
    await paintResultPath(visitedArray, source, destination, config);
}

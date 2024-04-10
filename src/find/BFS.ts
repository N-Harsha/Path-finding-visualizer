import { Node, Queue } from "../DS/Queue.js";
import { MOBILITY } from "../constants.js";
import { HTMLClassManager } from "../domUtils.js";
import { CoOrd, Config, EdgeMatrix, VisitedArrayType } from "../index.types.js";
import { isMovementPossible, paintResultPath } from "./utils.js";

export async function BFS(
    rows: number,
    columns: number,
    visitedArray: VisitedArrayType,
    horizontalEdges: EdgeMatrix,
    verticalEdges: EdgeMatrix,
    source: CoOrd,
    destination: CoOrd,
    config: Config
) {
    const queue = new Queue<Node>();
    visitedArray[source[0]][source[1]] = true;
    queue.enqueue(new Node(...source));

    const { maze } = config;

    while (!queue.isEmpty) {
        const currentNode = queue.dequeue();
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
                    while (!queue.isEmpty) {
                        queue.dequeue();
                    }
                    break;
                }
                // to avoid painting src into visited color
                if (newX !== destination[0] || newY !== destination[1])
                    await HTMLClassManager(
                        newX,
                        newY,
                        ["visited-tile"],
                        [],
                        config.speed
                    );
                visitedArray[newX][newY] = [currentNode.x, currentNode.y];
                queue.enqueue(new Node(newX, newY));
            }
        }
    }
    await paintResultPath(visitedArray, source, destination, config);
}

import { CoOrdArray } from "./index.types.js";

export const MOBILITY: CoOrdArray = [
    [0, -1], // left
    [-1, 0], // up
    [0, 1], // right
    [1, 0] // down
];
export const DIRECTIONS: Array<string> = ["LEFT", "TOP", "RIGHT", "BOTTOM"];

export const BLOCK_SIZE = 20;

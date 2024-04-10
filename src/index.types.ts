export type BooleanArray = boolean[];
export type EdgeMatrix = BooleanArray[];
export type CoOrd = [number, number];
export type CoOrdArray = CoOrd[];
export type VisitedArrayType = Array<Array<boolean | CoOrd>>;
export type Config = {
    speed: number;
    isBlocked: boolean;
    maze: boolean;
    findAlgorithm: FindAlgorithm;
};

export enum FindAlgorithm {
    DFS,
    BFS,
    AStar
}

export const EnumLookUp: { [key: string]: FindAlgorithm } = {
    DFS: FindAlgorithm.DFS,
    BFS: FindAlgorithm.BFS,
    AStar: FindAlgorithm.AStar
};

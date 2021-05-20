export interface SingleNode {
    row: number,
    col: number,
    isStart: boolean,
    isFinish: boolean,
    distance: number,
    isWall: boolean,
    isVisited: boolean, 
    isPath: boolean,
    previousNode: SingleNode | undefined
}

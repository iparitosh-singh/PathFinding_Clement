export enum nodeTypes {
    WALL = 'wall',
    START = 'start',
    FINISH = 'finish',
    NODE = 'node',
    VISITED = 'visited',
    VISITEDCURRENT = 'visited current',
    UNVISITED = 'unvisted',
    STARTVISITED = 'visited start',
    FINISHVISITED = 'visited finish',
    PATH = 'path',
    STARTPATH = 'path start',
    FINISHPATH = 'path finish',
}

export enum algoName {
    BFS = 'BFS', 
    Dijkstra = 'Dijkstar\'s', 
    AstarManhattan = 'A* Manhattan', 
}
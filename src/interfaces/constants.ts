export enum nodeTypes {
    WALL = 'wall',
    START = 'start',
    FINISH = 'finish',
    NODE = 'node',
    VISITED = 'visited',
    VISITEDCURRENT = 'visited current',
    UNVISITED = 'unvisted',
    STARTVISITED = 'start visited',
    FINISHVISITED = 'finish visited',
    PATH = 'path',
    PATHRIGHT = 'path right',
    PATHLEFT = 'path left',
    PATHUP = 'path up',
    PATHDOWN = 'path down',
    STARTPATHLEFT = 'start path left',
    STARTPATHRIGHT= 'start path right',
    STARTPATHDOWN= 'start path down',
    STARTPATHUP= 'start path up',

    FINISHPATHLEFT = 'finish path left',
    FINISHPATHRIGHT= 'finish path right',
    FINISHPATHUP= 'finish path up',
    FINISHPATHDOWN= 'finish path down',
}

export enum algoName {
    BFS = 'BFS', 
    Dijkstra = 'Dijkstar\'s', 
    AstarManhattan = 'A* Manhattan', 
}

export const startNodes = [
    nodeTypes.START, 
    nodeTypes.STARTPATHDOWN, 
    nodeTypes.STARTPATHLEFT, 
    nodeTypes.STARTPATHRIGHT, 
    nodeTypes.STARTPATHUP,
    nodeTypes.STARTVISITED
]

export const finishNodes = [
    nodeTypes.FINISH, 
    nodeTypes.FINISHPATHDOWN, 
    nodeTypes.FINISHPATHLEFT, 
    nodeTypes.FINISHPATHRIGHT, 
    nodeTypes.FINISHPATHUP,
    nodeTypes.FINISHVISITED
]
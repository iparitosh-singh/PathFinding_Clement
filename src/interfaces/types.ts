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
    STARTPATHLEFT = 'path start left',
    STARTPATHRIGHT= 'path start right',
    STARTPATHDOWN= 'path start down',
    STARTPATHUP= 'path start up',

    FINISHPATHLEFT = 'path finish left',
    FINISHPATHRIGHT= 'path finish right',
    FINISHPATHUP= 'path finish up',
    FINISHPATHDOWN= 'path finish down',
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
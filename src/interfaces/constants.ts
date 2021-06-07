import {algoType} from './index'
import * as algos from '../algorithms'
export enum nodeTypes {
    WALL = 'wall',
    START = 'start',
    FINISH = 'finish',
    NODE = 'node',
    VISITED = 'visited',
    VISITEDINSTANT = 'visited instant',
    VISITEDCURRENT = 'visited current',
    UNVISITED = 'unvisted',
    STARTVISITED = 'start visited',
    FINISHVISITED = 'finish visited',
    PATH = 'path',
    PATHINSTANT = 'path instant',
    PATHRIGHT = 'path right',
    PATHLEFT = 'path left',
    PATHUP = 'path up',
    PATHDOWN = 'path down',

    STARTPATHLEFT = 'start path left',
    STARTPATHRIGHT= 'start path right',
    STARTPATHDOWN= 'start path down',
    STARTPATHUP= 'start path up',

    STARTPATHUPINSTANT= 'start path up instant',
    STARTPATHLEFTINSTANT = 'start path left instant',
    STARTPATHRIGHTINSTANT= 'start path right instant',
    STARTPATHDOWNINSTANT= 'start path down instant',

    FINISHPATHRIGHT='finish path right',
    FINISHPATHLEFT = 'finish path left',
    FINISHPATHUP= 'finish path up',
    FINISHPATHDOWN= 'finish path down',

    FINISHPATHDOWNINSTANT= 'finish path down instant',
    FINISHPATHRIGHTINSTANT='finish path right instant',
    FINISHPATHUPINSTANT= 'finish path up instant',
    FINISHPATHLEFTINSTANT = 'finish path left instant',
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
export const startPath = [
    nodeTypes.STARTPATHDOWN, 
    nodeTypes.STARTPATHLEFT, 
    nodeTypes.STARTPATHRIGHT, 
    nodeTypes.STARTPATHUP,
]
export const finishPath = [
    nodeTypes.FINISHPATHDOWN, 
    nodeTypes.FINISHPATHLEFT, 
    nodeTypes.FINISHPATHRIGHT, 
    nodeTypes.FINISHPATHUP,
]

export enum actionType {
    resetFull,
    reset,
    redoAlgo,
    clearPath
}

export const algorithms: Array<algoType> = [
    {
        name: algoName.BFS,
        algorithm: algos.BFS
    },
    {
        name: algoName.Dijkstra,
        algorithm: algos.Dijkstra
    },
    {
        name: algoName.AstarManhattan,
        algorithm: algos.astarM
    }
]
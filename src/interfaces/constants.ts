import {algoType, mazeType} from './index'
import * as algos from '../algorithms'
import * as mazeAlgos from '../algorithms/MazeAlgorithms'
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

export enum mazeName {
    recursive = 'Recursive Maze',
    prims =  'Prims Maze'
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
        algorithm: algos.BFS,
        text: 'BFS Searches the nodes at the same depth from the start at same time'
    },
    {
        name: algoName.Dijkstra,
        algorithm: algos.Dijkstra,
        text: 'Dijkstra\'s algorithm just prioritizes path with the shortest distance'
    },
    {
        name: algoName.AstarManhattan,
        algorithm: algos.astarM,
        text: 'A* algorithm knows about the shortest the position of the target'
    }
]

export const mazeAlgorithms: Array<mazeType> = [
    {
        name: mazeName.recursive,
        algorithm: mazeAlgos.recursiveMaze,
        text: 'Recursive Maze generator algorithm'
    },
    {
        name: mazeName.prims,
        algorithm: mazeAlgos.primsMaze,
        text: 'Prims Maze generator algorithm'
    }
]


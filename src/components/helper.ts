import * as algos from '../algorithms'
import { algorithmNode, returnValue, algoType, cordinate} from '../interfaces'
import { gridNode } from './Board'
import {nodeTypes, algoName} from './types'

export const algorithms: algoType[] = [
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


const getNewAlgoNode = (row: number, col: number) : algorithmNode => {
    return {
        row: row,
        col: col,
        distance: Infinity,
        status: 'start',
        previousNode: undefined,
        weight: 1,
        isWall: false,
        heuristicDistance: 0
    }
}

export const getStatus = (gridNode: gridNode): string | undefined => {
    const nodeRef = gridNode.ref
    return nodeRef.current?.status
}
export const changeNormal = (
    node: gridNode,
    status: string,
    prevStatus?: string
): void => {
    const nodeRef = node.ref
    nodeRef.current?.changeStatus(status)
    if(!prevStatus){
        nodeRef.current?.setPrevState(nodeTypes.UNVISITED)
    }
    else {
        nodeRef.current?.setPrevState(prevStatus)
    }
}

const makeAlgorithmGrid = (grid: gridNode[][]): {
    nodeGrid: algorithmNode[][],
    start: algorithmNode,
    finish: algorithmNode
} => {
    let start = getNewAlgoNode(-1, -1)
    let finish = getNewAlgoNode(-1, -1)
    const nodeGrid: algorithmNode[][] = []
    for (let i = 0; i < grid.length; i++) {
        let nodeRow: algorithmNode[] = []
        for (let j = 0; j < grid[i].length; j++) {
            const nodeRef = grid[i][j].ref
            const status = getStatus(grid[i][j])
            if (nodeRef && status) {
                let newNode = getNewAlgoNode(i, j)
                if (status === nodeTypes.WALL) {
                    newNode.isWall = true
                }
                if (status === nodeTypes.START) {
                    start = newNode
                }
                else if (status === nodeTypes.FINISH) {
                    finish = newNode
                }
                nodeRow.push(newNode)
            }
        }
        nodeGrid.push(nodeRow)
    }
    return { nodeGrid, start, finish }
}

const animate = (node: gridNode, type: string, frameRate: number = 40)=> {
    return new Promise<void>(resolve => setTimeout(() => {
        changeNormal(node, type)
        resolve()
    }, frameRate))
}


export const animatePath = async (
    path: algorithmNode[],
    grid: gridNode[][],
    framRate: number = 40 
): Promise<void> => {
    for (let i = 0; i < path.length; i++) {
        const { row, col } = path[i];
        if (i === 0)
            await animate(grid[row][col], nodeTypes.STARTPATH, framRate)
        else if (i === path.length - 1)
            await animate(grid[row][col], nodeTypes.FINISHPATH, framRate)
        else
            await animate(grid[row][col], nodeTypes.PATH, framRate)
    }
}

export const aninimateVisitedNode = async (
    nodeVisitedOrder: algorithmNode[],
    grid: gridNode[][],
    framRate: number = 5
): Promise<void> => {
    for (let i = 0; i < nodeVisitedOrder.length; i++) {
        const { row, col } = nodeVisitedOrder[i];
        const node = grid[row][col];
        const nodeStatus = getStatus(node)
        if (nodeStatus === nodeTypes.START) {
            await animate(node, nodeTypes.STARTVISITED, framRate)
        }
        else if (nodeStatus === nodeTypes.FINISH) {
            await animate(node, nodeTypes.FINISHVISITED, framRate)
        }
        else
            await animate(node, nodeTypes.VISITED, framRate)
    }
}

export const getNodeVistedOrder = (selectedAlgo: number, grid: gridNode[][] ): returnValue => {
    const {nodeGrid, start, finish}= makeAlgorithmGrid(grid)
    return algorithms[selectedAlgo].algorithm(nodeGrid, start, finish)
}

export enum actionType {
    resetFull,
    reset,
    redoAlgo,
    clearPath
}

const changeNode = (node: gridNode, status: string, action: actionType) => {
    if(status === nodeTypes.WALL){
        if(action === actionType.resetFull){
            changeNormal(node, nodeTypes.UNVISITED)
        }
    }
    else if (
        status === nodeTypes.FINISH ||
        status === nodeTypes.FINISHPATH ||
        status === nodeTypes.FINISHVISITED
    ) {
        if(action === actionType.resetFull){
            changeNormal(node, nodeTypes.UNVISITED)
        }
        else if(action === actionType.reset) {
            changeNormal(node, nodeTypes.FINISH, nodeTypes.UNVISITED)
        }
        else if(action === actionType.clearPath){
            changeNormal(node, nodeTypes.VISITED)
        }
    }
    else if (
        status === nodeTypes.START ||
        status === nodeTypes.STARTPATH ||
        status === nodeTypes.STARTVISITED
    ) {
        if(action === actionType.resetFull){
            changeNormal(node, nodeTypes.UNVISITED)
        }
        else if(action === actionType.reset) {
            changeNormal(node, nodeTypes.START, nodeTypes.UNVISITED)
        }
        else if(action === actionType.clearPath){
            changeNormal(node, nodeTypes.VISITED)
        }
    }
    else if (status === nodeTypes.VISITED){
        if(action === actionType.reset || action === actionType.resetFull){
            changeNormal(node, nodeTypes.UNVISITED, nodeTypes.UNVISITED)
        }
    }
    else if(status === nodeTypes.PATH){
        changeNormal(node, nodeTypes.UNVISITED)
    }
}

export const remakingGrid = (
    action: actionType,
    grid: gridNode[][],
    cordinates?: { start: cordinate, finish: cordinate},
): void => {
    for (const row of grid) {
        for (const node of row) {
            if (node.ref.current)
                changeNode(node, node.ref.current.status, action)
        }
    }
    if(action === actionType.resetFull){
        if(!!cordinates){
            const {start, finish} = cordinates
            const startNode= grid[start.row][start.col]
            const finishNode = grid[finish.row][finish.col]
            changeNormal(startNode, nodeTypes.START)
            changeNormal(finishNode, nodeTypes.FINISH)
        }
    }
}

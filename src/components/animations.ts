import {
    changeNormal,
    makeAlgorithmGrid,
    getStatus,
    animate,
    checkStart,
    setDirectionPath,
    setStartOrFinishInstant,
    changeNode
} from "./helper"

import recursive_maze from '../algorithms/MazeAlgorithms/recursive_maze'
import { gridNode, algorithmNode, returnValue, algoType} from "../interfaces"
import { nodeTypes, algorithms, actionType } from "../interfaces/constants"

export const remakingGrid = (
    action: actionType,
    grid: gridNode[][],
): void => {
    for (const row of grid) {
        for (const node of row) {
            if (node.ref.current)
                changeNode(node, node.ref.current.status, action)
        }
    }
}

export const animatePath = async (
    path:Array<algorithmNode>,
    grid: Array<Array<gridNode>>,
    framRate: number
): Promise<void> => {
        for (let i = 0; i < path.length; i++) {
            const { row, col } = path[i];
            if (i === 0){
                const current = grid[path[i].row][path[i].col]
                const next = grid[path[1].row][path[1].col]
                await setDirectionPath(current, next, nodeTypes.START, framRate)
            }
            else if (i === path.length - 1){
                const prev = grid[path[i - 1].row][path[i - 1].col]
                const curr = grid[path[i].row][path[i].col]
                await setDirectionPath(prev, curr, nodeTypes.FINISH, framRate)
            }
            else{
                const current = grid[path[i].row][path[i].col]
                const next = grid[path[i + 1].row][path[i + 1].col]
                await setDirectionPath(current, next, nodeTypes.VISITED, framRate)
                await animate(grid[row][col], nodeTypes.PATH, framRate)
            }
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
                animate(node, nodeTypes.VISITEDCURRENT, framRate)
                animate(node, nodeTypes.STARTVISITED, framRate)
            }
            else if (nodeStatus === nodeTypes.FINISH) {
                animate(node, nodeTypes.VISITEDCURRENT, framRate)
                animate(node, nodeTypes.FINISHVISITED, framRate)
            }
            else if(nodeStatus === nodeTypes.UNVISITED){
                animate(node, nodeTypes.VISITEDCURRENT, framRate)
                animate(node, nodeTypes.VISITED, framRate)
            }
        }
}

export const getNodeVistedOrder = (selectedAlgo: number, grid: gridNode[][] ): returnValue => {
    const {nodeGrid, start, finish}= makeAlgorithmGrid(grid)
    return algorithms[selectedAlgo].algorithm(nodeGrid, start, finish)
}

export const getPathInstant= (
    grid: Array<Array<algorithmNode>>,
    start: algorithmNode,
    finish: algorithmNode,
    algorithm: algoType
): returnValue => {
    return algorithm.algorithm(grid, start, finish)
}

export const redoAlgo= (
    grid: Array<Array<gridNode>>,
    selectedAlgo: number,
    node: {row: number, col: number},
    type: nodeTypes,
    currentNode: nodeTypes
): void => {
    let { nodeGrid, start, finish } = makeAlgorithmGrid(grid)
    if(currentNode === nodeTypes.WALL)
        nodeGrid[node.row][node.col].isWall = false
    let returnVal: returnValue
    if (checkStart(type)) {
        returnVal = getPathInstant(nodeGrid, nodeGrid[node.row][node.col], finish, algorithms[selectedAlgo])
    }
    else {
        returnVal = getPathInstant(nodeGrid, start, nodeGrid[node.row][node.col], algorithms[selectedAlgo])
    }

    const { nodeVisitedOrder, path, endReached } = returnVal
    if (nodeVisitedOrder.length <= 0) return
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const status = getStatus(grid[row][col])
            if (status !== nodeTypes.WALL) {
                changeNormal(grid[row][col], nodeTypes.UNVISITED, nodeTypes.UNVISITED)
            }
        }
    }
    for (let i = 0; i < nodeVisitedOrder.length; i++) {
        const { row, col } = nodeVisitedOrder[i]
        const node = grid[row][col]
        if (!node.ref.current)
            continue
        changeNormal(node, nodeTypes.VISITEDINSTANT)
    }


    if (endReached && path.length > 0) {
        //setting the start path direction
        setStartOrFinishInstant(grid[path[0].row][path[0].col], grid[path[1].row][path[1].col], nodeTypes.START)
        for (let i = 1; i < path.length - 1; i++) {
            const { row, col } = path[i]
            const node = grid[row][col]
            if (!node.ref.current)
                continue
            changeNormal(node, nodeTypes.PATHINSTANT)
        }
        const size = path.length - 1
        setStartOrFinishInstant(grid[path[size - 1].row][path[size - 1].col], grid[path[size].row][path[size].col], nodeTypes.FINISH)
    }

}

export const animateMaze = async (grid: gridNode[][]): Promise<void> => {
    const algoGrid = makeAlgorithmGrid(grid)
    const {nodesOrder, start, finish} = recursive_maze(algoGrid.nodeGrid)
    for(const row of grid){
        for(const node of row)
            changeNormal(node, nodeTypes.WALL)
    }

    for(const node of nodesOrder)
        await animate(grid[node.row][node.col], nodeTypes.UNVISITED, 1)
    changeNormal(grid[start.row][start.col], nodeTypes.START, nodeTypes.UNVISITED)
    changeNormal(grid[finish.row][finish.col], nodeTypes.FINISH, nodeTypes.UNVISITED)
}

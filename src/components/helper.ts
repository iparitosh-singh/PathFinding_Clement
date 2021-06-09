import {
    nodeTypes,
    algorithms,
    actionType,
} from '../interfaces/constants'

import {
    algorithmNode,
    returnValue,
    gridNode,
    algoType
} from '../interfaces'

const getNewAlgoNode = (row: number, col: number) : algorithmNode => {
    return {
        row: row,
        col: col,
        distance: Infinity,
        previousNode: undefined,
        weight: 1,
        isWall: false,
        heuristicDistance: 0
    }
}

export const getStatus = (gridNode: gridNode): nodeTypes  => {
    const nodeRef = gridNode.ref
    if(!nodeRef.current)
        return nodeTypes.UNVISITED
    return nodeRef.current?.status
}

export const changeNormal = (
    node: gridNode,
    status: nodeTypes,
    prevStatus?: nodeTypes
): void => {
        const nodeRef = node.ref
        nodeRef.current?.changeStatus(status)
        if (prevStatus) {
            nodeRef.current?.setPrevState(prevStatus)
        }
}

const makeAlgorithmGrid = (grid: Array<Array<gridNode>>): {
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
                if (checkStart(status)) {
                    start = newNode
                }
                else if (checkFinish(status)) {
                    finish = newNode
                }
                nodeRow.push(newNode)
            }
        }
        nodeGrid.push(nodeRow)
    }
    return { nodeGrid, start, finish }
}

const animate = (node: gridNode, status: nodeTypes, frameRate: number = 40)=> {
    return new Promise<void>(resolve => setTimeout(() => {
        changeNormal(node, status)
        resolve()
    }, frameRate))
}

const setDirection = async (current: gridNode, next: gridNode, type: nodeTypes, frameRate: number): Promise<void> => {
    if(current.row === next.row){
        //going left
        if(current.col > next.col){
            if(type === nodeTypes.START){
                await animate(current, nodeTypes.STARTPATHLEFT, frameRate)
            }
            else if(type === nodeTypes.FINISH){
                await animate(next, nodeTypes.FINISHPATHLEFT, frameRate)
            }
            else
                await animate(current, nodeTypes.PATHLEFT, frameRate)
        }
        //going right
        else {
            if (type === nodeTypes.START) {
                await animate(current, nodeTypes.STARTPATHRIGHT, frameRate)
            }
            else if (type === nodeTypes.FINISH) {
                await animate(next, nodeTypes.FINISHPATHRIGHT, frameRate)
            }
            else
                await animate(current, nodeTypes.PATHRIGHT, frameRate)
        }
    }
    else {
        //going up
        if(current.row > next.row){
            if(type === nodeTypes.START){
                await animate(current, nodeTypes.STARTPATHUP, frameRate)
            }
            //for finish node we check prev node
            else if(type === nodeTypes.FINISH){
                await animate(next, nodeTypes.FINISHPATHUP, frameRate)
            }
            else
            await animate(current, nodeTypes.PATHUP, frameRate)
        }
        //going down
        else {
            if(type === nodeTypes.START){
                await animate(current, nodeTypes.STARTPATHDOWN, frameRate)
            }
            else if(type === nodeTypes.FINISH){
                await animate(next, nodeTypes.FINISHPATHDOWN, frameRate)
            }
            else
            await animate(current, nodeTypes.PATHDOWN, frameRate)
        }
    }
}

export const animatePath = async (
    path:Array<algorithmNode>,
    grid: Array<Array<gridNode>>,
    framRate: number = 10
): Promise<void> => {
    for (let i = 0; i < path.length; i++) {
        const { row, col } = path[i];
        if (i === 0){
            const current = grid[path[i].row][path[i].col]
            const next = grid[path[1].row][path[1].col]

            await setDirection(current, next, nodeTypes.START, framRate)
        }
        else if (i === path.length - 1){
            const prev = grid[path[i - 1].row][path[i - 1].col]
            const curr = grid[path[i].row][path[i].col]
            await setDirection(prev, curr, nodeTypes.FINISH, framRate)
        }
        else{
            const current = grid[path[i].row][path[i].col]
            const next = grid[path[i + 1].row][path[i + 1].col]
            await setDirection(current, next, nodeTypes.VISITED, framRate)
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
            await animate(node, nodeTypes.VISITEDCURRENT, framRate)
            await animate(node, nodeTypes.STARTVISITED, framRate)
        }
        else if (nodeStatus === nodeTypes.FINISH) {
            await animate(node, nodeTypes.VISITEDCURRENT, framRate)
            await animate(node, nodeTypes.FINISHVISITED, framRate)
        }
        else if(nodeStatus === nodeTypes.UNVISITED){
            await animate(node, nodeTypes.VISITEDCURRENT, framRate)
            await animate(node, nodeTypes.VISITED, framRate)
        }

    }
}

export const getNodeVistedOrder = (selectedAlgo: number, grid: gridNode[][] ): returnValue => {
    const {nodeGrid, start, finish}= makeAlgorithmGrid(grid)
    return algorithms[selectedAlgo].algorithm(nodeGrid, start, finish)
}


export const checkStart = (status: nodeTypes): boolean => {
    const types = status.split(' ')
    return types[0] === 'start'
}
export const checkFinish = (status: nodeTypes): boolean => {
    const types = status.split(' ')
    return types[0] === 'finish'
}

const changeNode = (node: gridNode, status: nodeTypes, action: actionType) => {
    if(status === nodeTypes.WALL){
        if(action === actionType.resetFull){
            changeNormal(node, nodeTypes.UNVISITED)
        }
    }
    else if (checkFinish(status)) {
        if(action === actionType.resetFull){
            changeNormal(node, nodeTypes.FINISH, nodeTypes.UNVISITED)
        }
        else if(action === actionType.reset) {
            changeNormal(node, nodeTypes.FINISH, nodeTypes.UNVISITED)
        }
        else if(action === actionType.clearPath){
            changeNormal(node, nodeTypes.VISITED)
        }
    }
    else if (checkStart(status)) {
        if(action === actionType.resetFull){
            changeNormal(node, nodeTypes.START, nodeTypes.UNVISITED)
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
): void => {
    for (const row of grid) {
        for (const node of row) {
            if (node.ref.current)
                changeNode(node, node.ref.current.status, action)
        }
    }
}
const setStartOrFinish = (earlyNode: gridNode, lateNode: gridNode, type: nodeTypes) =>{
    if(earlyNode.row === lateNode.row){
        if(earlyNode.col > lateNode.col){
            if(type === nodeTypes.START){
                changeNormal(earlyNode, nodeTypes.STARTPATHLEFTINSTANT, nodeTypes.UNVISITED)
            }
            else {
                changeNormal(lateNode, nodeTypes.FINISHPATHLEFTINSTANT, nodeTypes.UNVISITED)
            }
        }
        else {
            if(type === nodeTypes.START){
                changeNormal(earlyNode, nodeTypes.STARTPATHRIGHTINSTANT, nodeTypes.UNVISITED)
            }
            else {
                changeNormal(lateNode, nodeTypes.FINISHPATHRIGHTINSTANT, nodeTypes.UNVISITED)
            }
        }
    }
    else {
        if(earlyNode.row > lateNode.row){
            if(type === nodeTypes.START){
                changeNormal(earlyNode, nodeTypes.STARTPATHDOWNINSTANT, nodeTypes.UNVISITED)
            }
            else {
                changeNormal(lateNode, nodeTypes.FINISHPATHDOWNINSTANT, nodeTypes.UNVISITED)
            }
        }
        else {
            if(type === nodeTypes.START){
                changeNormal(earlyNode, nodeTypes.STARTPATHUPINSTANT, nodeTypes.UNVISITED)
            }
            else {
                changeNormal(lateNode, nodeTypes.FINISHPATHUPINSTANT, nodeTypes.UNVISITED)
            }
        }
    }
}

export const animateInstant = (
    grid: Array<Array<algorithmNode>>,
    start: algorithmNode,
    finish: algorithmNode,
    algorithm: algoType
): returnValue => {
    return algorithm.algorithm(grid, start, finish)
}

export const redoAlog = (
    grid: Array<Array<gridNode>>,
    selectedAlgo: number,
    node: {row: number, col: number},
    type: nodeTypes
): void => {
    let { nodeGrid, start, finish } = makeAlgorithmGrid(grid)
    let returnVal: returnValue
    if(checkStart(type)){
        returnVal = animateInstant(nodeGrid, nodeGrid[node.row][node.col], finish, algorithms[selectedAlgo])
    }
    else {
        returnVal = animateInstant(nodeGrid, start, nodeGrid[node.row][node.col], algorithms[selectedAlgo])
    }

    const { nodeVisitedOrder, path, endReached} = returnVal
    if(nodeVisitedOrder.length <= 0) return
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
        changeNormal(node, nodeTypes.VISITEDINSTANT, nodeTypes.UNVISITED)
    }
    if (endReached && path.length <= 0) {
        setStartOrFinish(grid[path[0].row][path[0].col], grid[path[1].row][path[1].col], nodeTypes.START)
        for (let i = 1; i < path.length - 1; i++) {
            const { row, col } = path[i]
            const node = grid[row][col]
            if (!node.ref.current)
                continue
            changeNormal(node, nodeTypes.PATHINSTANT, nodeTypes.UNVISITED)
        }
        const size = path.length - 1
        setStartOrFinish(grid[path[size - 1].row][path[size - 1].col], grid[path[size].row][path[size].col], nodeTypes.FINISH)
    }
}

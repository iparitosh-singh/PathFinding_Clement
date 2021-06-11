import {
    nodeTypes,
    actionType,
} from '../interfaces/constants'

import {
    algorithmNode,
    gridNode,
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

export const makeAlgorithmGrid = (grid: Array<Array<gridNode>>): {
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

export const animate = (node: gridNode, status: nodeTypes, frameRate: number = 40)=> {
    return new Promise<void>(resolve => setTimeout(() => {
        changeNormal(node, status)
        resolve()
    }, frameRate))
}

export const setDirectionPath = async (current: gridNode, next: gridNode, type: nodeTypes, frameRate: number): Promise<void> => {
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




export const checkStart = (status: nodeTypes): boolean => {
    const types = status.split(' ')
    return types[0] === 'start'
}
export const checkFinish = (status: nodeTypes): boolean => {
    const types = status.split(' ')
    return types[0] === 'finish'
}

export const changeNode = (node: gridNode, status: nodeTypes, action: actionType) => {
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
    else if (status === nodeTypes.VISITED || status === nodeTypes.VISITEDINSTANT){
        if(action === actionType.reset || action === actionType.resetFull){
            changeNormal(node, nodeTypes.UNVISITED, nodeTypes.UNVISITED)
        }
    }
    else if(status === nodeTypes.PATH || status === nodeTypes.PATHINSTANT){
        changeNormal(node, nodeTypes.UNVISITED)
    }
}

export const setStartOrFinishInstant = (earlyNode: gridNode, lateNode: gridNode, type: nodeTypes) =>{
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

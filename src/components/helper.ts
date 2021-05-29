import { BFS, Dijkstra } from '../algorithms'
import { algorithmNode, returnValue, algoType} from '../interfaces'
import { gridNode } from './Board'


export const algorithms: algoType[] = [
    {
        name: "BFS",
        algorithm: BFS
    },
    {
        name: "Dijkstra's",
        algorithm: Dijkstra
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
        isWall: false
    }
}

export const getStatus = (gridNode: gridNode) => {
    const nodeRef = gridNode.ref
    return nodeRef.current?.status
}
export const changeNormal = (node: gridNode, status: string | undefined): void => {
    const nodeRef = node.ref
    if(!status) nodeRef.current?.changeStatus('unvisited')
    else nodeRef.current?.changeStatus(status)
}

const makeGrid = (grid: gridNode[][]): {
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
                if (status === 'unweighted-wall' || status === 'weighted-wall') {
                    newNode.isWall = true
                }
                if (status === 'start') {
                    start = newNode
                }
                else if (status === 'finish') {
                    finish = newNode
                }
                nodeRow.push(newNode)
            }
        }
        nodeGrid.push(nodeRow)
    }
    return { nodeGrid, start, finish }
}

export const getClassNameFromStatus = (newStatus: string): string => {
    let newClassName = 'node'
    switch(newStatus){
        case 'unweighted-wall': 
            newClassName += '-wall'
            break
        case 'weighted-wall':
            newClassName += '-weighted-wall'
            break
        case 'visited':
                newClassName += '-visited'
            break
        case 'path': 
                newClassName += '-path'
            break
        case 'unVisited':
            break
        case 'start':
                newClassName += '-start'
            break
        case 'finish':
                newClassName += '-end'
            break
        case 'start-visited':
                newClassName += '-visited-start';
                break
        case 'finish-visited':
                newClassName += '-visited-finish';
                break
        case 'start-path':
                newClassName += '-path-start'
                break
        case 'finish-path':
                newClassName += '-path-finish'
                break
    }
    return newClassName 
}
export const getNodeVistedOrder = (selectedAlgo: number, grid: gridNode[][] ): returnValue => {
    console.log(selectedAlgo)
    const {nodeGrid, start, finish}= makeGrid(grid)
    return algorithms[selectedAlgo].algorithm(nodeGrid, start, finish)
}
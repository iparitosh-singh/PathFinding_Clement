import { BFS, Dijkstra } from '../algorithms'
import { algorithmNode, returnValue, algoType} from '../interfaces'
import { gridNode } from './Board'
import * as nodeTypes from './nodeType'


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
        isWall: false,
        heuristicDistance: 0
    }
}

export const getStatus = (gridNode: gridNode): string | undefined => {
    const nodeRef = gridNode.ref
    return nodeRef.current?.status
}
export const changeNormal = (node: gridNode, status: string | undefined): void => {
    const nodeRef = node.ref
    if(!status) nodeRef.current?.changeStatus(nodeTypes.UNVISITED)
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

export const getNodeVistedOrder = (selectedAlgo: number, grid: gridNode[][] ): returnValue => {
    const {nodeGrid, start, finish}= makeGrid(grid)
    return algorithms[selectedAlgo].algorithm(nodeGrid, start, finish)
}
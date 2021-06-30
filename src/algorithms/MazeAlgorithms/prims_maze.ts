import {algorithmNode} from "../../interfaces"
import {getNextPossibleNodes, chooseStartEnd} from '../utility'

const recursize_prims = (
    grid: algorithmNode[][]
): Set<algorithmNode> => {
    let nodesOrder: Set<algorithmNode> = new Set()
    const currentRow = Math.floor(Math.random()* grid.length)
    const currentCol = Math.floor(Math.random()* grid[0].length)
    const current = grid[currentRow][currentCol]

    current.isWall = false
    nodesOrder.add(current)
    let neighbours = getNextPossibleNodes(grid, current)
    while(neighbours.length){
        let rndIndex = Math.floor(Math.random()* neighbours.length)
        const [betweenNode, nextNode] = neighbours[rndIndex]
        neighbours.splice(rndIndex, 1)
        if(nextNode.isWall){
            nextNode.isWall = false
            betweenNode.isWall = false
            nodesOrder.add(betweenNode)
            nodesOrder.add(nextNode)
            let newNeighbours = getNextPossibleNodes(grid, nextNode)
            for(const node of newNeighbours)
                neighbours.push(node)
        }
    }
    return nodesOrder
}

const prims_maze = (grid: algorithmNode[][]) => {
    for(const row of grid)
        for(const node of row)
            node.isWall = true
    const nodesOrder = recursize_prims(grid)
    const {start, finish} = chooseStartEnd(grid)
    return {start, finish, nodesOrder}
}

export default prims_maze

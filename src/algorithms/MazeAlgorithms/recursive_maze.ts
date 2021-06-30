import { algorithmNode, MazeNode } from "../../interfaces"
import {getNextPossibleNodes, chooseStartEnd} from '../utility'

const recursive_maze = (grid: algorithmNode[][]): {
    nodesOrder: Set<algorithmNode>,
    start: {row: number, col: number},
    finish: {row: number, col: number}
} => {
    for(const row of grid)
        for(const node of row)
            node.isWall = true
    const nodesOrder = recursiveFunction(grid)
    const {start, finish} = chooseStartEnd(grid)
    return {nodesOrder, start, finish}
}

//even row / col is wall
const recursiveFunction = (
    grid: Array<Array<algorithmNode>>,
): Set<algorithmNode> =>{
    let stack: Array<MazeNode> = []
    let node = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid[0].length)]
    const neighbours = getNextPossibleNodes(grid, node)
    const rndIndex = Math.floor(Math.random()* neighbours.length)
    let nodesOrder: Set<algorithmNode> = new Set()

    stack.push(neighbours[rndIndex])
    while(stack.length > 0){
        const [betweenNode, nextNode] = stack[stack.length - 1]
        betweenNode.isWall = false
        nextNode.isWall = false
        nodesOrder.add(betweenNode)
        nodesOrder.add(nextNode)
        const neighbours = getNextPossibleNodes(grid, nextNode)
        if(neighbours.length > 0){
            let rndIndex = Math.floor(Math.random()* neighbours.length)
            stack.push(neighbours[rndIndex])
        }
        else
            stack.pop()
    }
    return nodesOrder
}


export default recursive_maze

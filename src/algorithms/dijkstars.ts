import {
    algorithmNode, returnValue
} from '../interfaces'

import { generateVisited, getPath, getUnvistedNeighbours } from './utility'



const dijkstras = (grid: algorithmNode[][], start: algorithmNode, finish: algorithmNode): returnValue  => {
    let nodeVisitedOrder: algorithmNode[] = []
    let endReached: boolean = false
    const visited = generateVisited(grid)
    let priority_queue: algorithmNode[] = getAllunvisited(grid) 
    start.distance = 0
    while(!!priority_queue.length){
        const closest_node = getClosestNode(priority_queue)
        if(typeof(closest_node) === 'number') break 
        const {row, col} = closest_node
        visited[row][col] = true
        nodeVisitedOrder.push(closest_node)
        if(closest_node.row === finish.row && closest_node.col === finish.col){
            endReached = true
            break
        }
        const neighbours = getUnvistedNeighbours(closest_node, grid, visited)
        for(const nieghbour of neighbours){
            nieghbour.distance = closest_node.distance + 1
            nieghbour.previousNode = closest_node
        }
    }
    let path = endReached ? getPath(finish) : []
    return {nodeVisitedOrder, path, endReached}
}


const getClosestNode = (queue: algorithmNode[]) : algorithmNode | number => {
    queue.sort((a, b) => a.distance - b.distance)
    let node = queue.shift()
    if(node) return node
    else return -1 
}

const getAllunvisited = (grid: algorithmNode[][]): algorithmNode[] => {
    let queue: algorithmNode[] = []
    for(const row of grid)
        for(const node of row)
            if(!node.isWall)
                queue.push(node)
    return queue
}
export default dijkstras
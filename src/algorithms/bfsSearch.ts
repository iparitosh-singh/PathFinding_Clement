import {
    algorithmNode, 
    returnValue
} from '../interfaces'

import {generateVisited, getPath, getUnvistedNeighbours} from './utility'


const BFS = (grid: algorithmNode[][], start: algorithmNode, finish: algorithmNode): returnValue => {
    const nodeVisitedOrder: algorithmNode[] = []
    const visited = generateVisited(grid)
    let queue: algorithmNode[] = []
    queue.push(start)
    visited[start.row][start.col] = true
    nodeVisitedOrder.push(start)
    let endReached = false 
    let flag = false 

    while(!!queue.length){
        if(flag) break
        const current_node = getCurrentNode(queue)
        if(typeof(current_node) === 'number') break
        const neighbours = getUnvistedNeighbours(current_node, grid, visited)
        for(const neighbour of neighbours){
            neighbour.previousNode = current_node
            queue.push(neighbour)
            visited[neighbour.row][neighbour.col] = true
            nodeVisitedOrder.push(neighbour)
            if(finish.col === neighbour.col && finish.row === neighbour.row){
                endReached = true
                flag = true
                break
            }
        }
    }
    const path = endReached ? getPath(finish) : []
    return {nodeVisitedOrder, path, endReached}
}


const getCurrentNode = (queue: algorithmNode[]): algorithmNode | number => {
    const node = queue.shift()
    if(node) return node
    return -1
}

export default BFS
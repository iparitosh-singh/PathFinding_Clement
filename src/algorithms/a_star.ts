import { algorithmNode, returnValue } from "../interfaces"
import { generateVisited, getUnvistedNeighbours, getPath } from "./utility"

const aStarManhattan = (grid: algorithmNode[][], start: algorithmNode, finish: algorithmNode): returnValue => {
    let nodeVisitedOrder: algorithmNode[] = []
    let endReached = false
    const visited = generateVisited(grid)
    addHeuristicDistance(grid, finish)
    let priority_queue = getAllunvisited(grid)
    start.distance = 0
    while(!!priority_queue.length){
        const closest_node = getClosestNode(priority_queue)
        if(typeof(closest_node) === 'number') break
        if(closest_node.distance === Infinity) break
        const {row, col} = closest_node
        visited[row][col] = true
        nodeVisitedOrder.push(closest_node)
        if(row === finish.row && col === finish.col){
            endReached = true
            break
        }
        const neighbours = getUnvistedNeighbours(closest_node, grid, visited)
        for(const neighbour of neighbours){
            neighbour.distance = closest_node.distance + neighbour.weight
            neighbour.previousNode = closest_node
        }
    }

    let path = endReached ? getPath(finish) : []
    return {nodeVisitedOrder, endReached, path}
}


const getAllunvisited = (grid: algorithmNode[][]): algorithmNode[] => {
    let queue: algorithmNode[] = []
    for(const row of grid)
        for(const node of row)
            if(!node.isWall)
                queue.push(node)
    return queue
}

const getClosestNode = (queue: algorithmNode[]) : algorithmNode | number => {
    queue.sort((a, b) => {
        let distanceA = a.heuristicDistance + a.distance
        let distanceB = b.heuristicDistance + b.distance
        if(distanceA === distanceB){
            return a.heuristicDistance - b.heuristicDistance
        }
        return (
            (a.heuristicDistance + a.distance) - (b.distance + b.heuristicDistance)
        )
    })
    let node = queue.shift()
    if(node) return node
    else return -1 
}


const addHeuristicDistance = (grid: algorithmNode[][], finish: algorithmNode) => {
    for(const row of grid){
        for(const node of row){
            if(node.isWall) continue
            const distance = manhattanDistance(node, finish)
            node.heuristicDistance = distance
        }
    }
}

const manhattanDistance = (nodeA: algorithmNode, nodeB: algorithmNode): number => {
    const yChange = Math.abs(nodeA.row - nodeB.row)
    const xChange = Math.abs(nodeA.col - nodeB.col)
    return xChange + yChange
}

export default aStarManhattan
import {
    algorithmNode, 
    cordinate, 
    returnValue
} from '../interfaces'

const BFS = (grid: algorithmNode[][], start: cordinate, finish: cordinate): returnValue => {
    let dr = [-1, 0, +1, 0]
    let dc = [0, 1, 0, -1]

    let visited: boolean[][] = generateVisited(grid)
    let R: number = grid.length, C: number = grid[0].length
    let nodeVisitedOrder: algorithmNode[] = []

    let rq: number[] = []
    let cq: number[] = []
    let endReached: boolean = false
    rq.push(start.row)
    cq.push(start.col)
    visited[start.row][start.col] = true
    let flag = false

    while (rq.length && cq.length) {
        let r = rq.shift()
        let c = cq.shift()

        if (r === finish.row && c === finish.col) {
            endReached = true
            if (r !== undefined && c !== undefined)
                nodeVisitedOrder.push(grid[r][c])
            break
        }

        for (let i = 0; i < 4; i++) {
            if (r !== undefined && c !== undefined) {
                let rr = r + dr[i]
                let cc = c + dc[i]

                if (rr < 0 || cc < 0) continue
                if (rr >= R || cc >= C) continue

                if (visited[rr][cc]) continue
                if (grid[rr][cc].status === 'unweighted-wall') continue


                rq.push(rr)
                cq.push(cc)
                visited[rr][cc] = true
                grid[rr][cc].previousNode = grid[r][c]
                nodeVisitedOrder.push(grid[rr][cc])
                if (rr === finish.row && cc === finish.col) {
                    flag = true
                    break
                }
            }
            if (flag)
                break
        }
    }
    let path: algorithmNode[] = []
    if(endReached){
        let currentNode: algorithmNode | undefined
        currentNode = nodeVisitedOrder[nodeVisitedOrder.length - 1]
        path.push(currentNode)

        while (currentNode !== undefined) {
            currentNode = currentNode.previousNode
            if (currentNode !== undefined) {
                path.push(currentNode)
            }
        }
        if (path) path.reverse()
    }

    return { nodeVisitedOrder, path, endReached }
}

const generateVisited = (grid: algorithmNode[][]) => {
    let visited: boolean[][] = []
    for (let i = 0; i < grid.length; i++) {
        let arr : boolean[] = []
        for (let j = 0; j < grid[i].length; j++) {
            arr.push(false)
        }
        visited.push(arr)
    }
    return visited 
}

export default BFS
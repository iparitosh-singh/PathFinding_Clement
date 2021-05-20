import {SingleNode} from '../interfaces/gridInterfaces'

let dr = [-1, 0, +1, 0]
let dc = [0, 1, 0, -1]

let R: number = 20, C : number = 40

const BFS_searchAlgorithm= (grid: SingleNode[][], start : any, finish : any) => {
    let visited: boolean[][] = generateVisited()
    let nodeVisitedOrder: SingleNode[] = []

    let endReached: boolean = false
    let rq: number[] = [] //row queue
    let cq: number[] = [] //col queue

    rq.push(start.row)
    cq.push(start.col)
    visited[start.row][start.col] = true

    while(rq.length && cq.length){
        let r = rq.shift() 
        let c = cq.shift()

        if(r === finish.row && c === finish.col) {
            endReached = true
            if(r !== undefined && c !== undefined)
                nodeVisitedOrder.push(grid[r][c])
            break
        }

        //explore the neighboures
        for(let i = 0; i < 4; i++){
            if(r !== undefined && c !== undefined){
                let rr = r + dr[i]
                let cc = c + dc[i]

                if (rr < 0 || cc < 0) continue
                if (rr >= R || cc >= C) continue
                if(!visited[rr]) console.log(rr, cc)

                if (visited[rr][cc]) continue
                if (grid[rr][cc].isWall) continue

                rq.push(rr)
                cq.push(cc)
                visited[rr][cc] = true
                grid[rr][cc].previousNode = grid[r][c]
                nodeVisitedOrder.push(grid[rr][cc])
            }
        }
    }

    let path : SingleNode[] | undefined = []
    let currentNode : SingleNode | undefined
    currentNode = nodeVisitedOrder[nodeVisitedOrder.length - 1]
    path.push(currentNode)

    while(currentNode){
        currentNode = currentNode.previousNode
        if(currentNode !== undefined){
            path.push(currentNode)
        }
    }
    if(path) path.reverse()
    return {nodeVisitedOrder, endReached, path}
}


const generateVisited = () => {
    let visited: boolean[][] = []
    for (let i = 0; i < R; i++) {
        let arr : boolean[] = []
        for (let j = 0; j < C; j++) {
            arr.push(false)
        }
        visited.push(arr)
    }
    return visited 
}

export default BFS_searchAlgorithm
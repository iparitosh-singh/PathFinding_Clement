import { algorithmNode, MazeNode } from "../interfaces"

export const generateVisited = (grid: algorithmNode[][]): boolean[][] => {
    let visited: boolean[][] = []
    for (let i = 0; i < grid.length; i++) {
        let arr : boolean[] = []
        for (let j = 0; j < grid[0].length; j++) {
            arr.push(false)
        }
        visited.push(arr)
    }
    return visited
}

export const getUnvistedNeighbours = (node: algorithmNode, grid: algorithmNode[][], visited: boolean[][]): algorithmNode[] => {
    let neighbours: algorithmNode[] = []
    const {row, col} = node
    for(var i = 0; i < direction.length; i++){
        const r = row + direction.x[i]
        const c = col + direction.y[i]
        if(r < 0 || c < 0) continue
        if(r > grid.length - 1 || c > grid[0].length - 1) continue
        const current_node = grid[r][c]
        if (current_node.isWall) continue
        if(visited[r][c]) continue
        neighbours.push(current_node)
    }
    return neighbours
}

export const getPath = (finish: algorithmNode) => {
    let path: algorithmNode[] = []
    let current_node: algorithmNode | undefined = finish
    while(current_node !== undefined){
        path.push(current_node)
        current_node = current_node.previousNode
    }
    return path.reverse()
}

export const getNextPossibleNodes = (grid: algorithmNode[][], currentNode: algorithmNode): Array<MazeNode> => {
    let neighbours: MazeNode[] = []
    for(let i = 0; i < direction.length; i++){
        let row = currentNode.row + 2 * direction.x[i]
        let col = currentNode.col+ 2 * direction.y[i]
        if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length)
            continue
        if(!grid[row][col].isWall)
            continue
        let nextNode = grid[row][col]
        let betweenNode = grid[row - direction.x[i]][col - direction.y[i]]
        neighbours.push([betweenNode, nextNode])
    }
    return neighbours
}

export const chooseStartEnd = (grid: algorithmNode[][])
:{
    start: {row: number, col: number},
    finish: {row: number, col: number}
} => {
    let startRow = Math.floor(Math.random() * grid.length)
    let startCol = Math.floor(Math.random() * grid[0].length)
    while(grid[startRow][startCol].isWall){
        startRow = Math.floor(Math.random() * grid.length)
        startCol = Math.floor(Math.random() * grid[0].length)
    }

    let endRow = Math.floor(Math.random() * grid.length)
    let endCol = Math.floor(Math.random() * grid[0].length)

    while(grid[endRow][endCol].isWall){
        endRow = Math.floor(Math.random() * grid.length)
        endCol = Math.floor(Math.random() * grid[0].length)
    }
    const start = {
        row: startRow,
        col: startCol
    }
    const finish = {
        row: endRow,
        col: endCol
    }
    return {start, finish}
}

export const direction =  {
    x: [-1, 0, 1, 0],
    y: [0, 1, 0, -1],
    length: 4
}


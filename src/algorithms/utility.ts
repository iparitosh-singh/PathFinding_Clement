import { algorithmNode } from "../interfaces"

export const generateVisited = (grid: algorithmNode[][]) => {
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

export const direction =  {
    x: [-1, 0, 1, 0],
    y: [0, 1, 0, -1],
    length: 4
}


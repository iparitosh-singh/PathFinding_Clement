import { algorithmNode, returnValue } from "../interfaces"
import { generateVisited, getUnvistedNeighbours, getPath } from "./utility"

const recursive_maze= (grid: algorithmNode[][], start: algorithmNode, finish: algorithmNode): void=> {
   const visited = generateVisited(grid)
   let stack: Array<algorithmNode> = []
   if((start.row === 0 && start.col === 0) || (finish.row === 0 && finish.col === 0)){
       stack.push(grid[0][1])
       visited[0][1] = true
   }
   else{
       stack.push(grid[0][0])
       visited[0][0] = true
   }

   while(!!stack.length){
      const current = stack.pop()
      if(!current)
         break
      const neighbours = getUnvistedNeighbours(current, grid, visited)
      if(neighbours.length === 0)
         break

      let randIndex = Math.floor(Math.random() + 1 * neighbours.length) - 1
      neighbours.forEach((neighbour, index) => {
         if(index !== randIndex){
            stack.push(neighbour)
         }
         const {row, col} = neighbour
         visited[row][col] = true
      })

   }

}

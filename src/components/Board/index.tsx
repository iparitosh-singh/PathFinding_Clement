import React, { useEffect, useState } from 'react'
import Node from '../Node'
import BFS from '../../algorithms/bfsSearch'
import {SingleNode} from '../../interfaces/gridInterfaces'

const HEIGHT  = 20
const WIDTH = 40


const createNode = (row: number, col: number) => {
    const newNode: SingleNode = {
        row: row, col: col,
        isStart: false,
        isFinish: false,
        distance: Infinity,
        isWall: false,
        isVisited: false,
        isPath: false,
        previousNode: undefined
    }
    return newNode
}

const getInitialGrid = () => {
    const grid : SingleNode[][] = []
    for(let row = 0; row < HEIGHT; row++){
        const currentRow: SingleNode[] = []
        for(let col = 0; col < WIDTH; col++){
            currentRow.push(createNode(row, col))
        }
        grid.push(currentRow)
    }
    return grid
}

const updateGridWall = (grid: SingleNode[][], row: number, col: number) => {
    let newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
        ...node, 
        isWall: true
    }
    newGrid[row][col] = newNode
    return newGrid
}


const Board : React.FC<any> = () => {
    const [grid, setGrid] = useState<SingleNode[][]>([])
    const [mousePressed, setMousePressed] = useState<boolean>(false)
    const [start, setStart] = useState({})
    const [end , setFinish] = useState({})


    useEffect(() => {
        let grid = getInitialGrid()
        const startRow = Math.floor(HEIGHT / 2)
        const startCol = Math.floor(WIDTH / 4)
        grid[startRow][startCol].isStart = true
        setStart({
            row: startRow,
            col: startCol
        })

        const finishRow= Math.floor(HEIGHT / 2)
        const finishCol= Math.floor(3 * WIDTH / 4)
        setFinish({
            row: finishRow,
            col: finishCol
        })
        grid[startRow][startCol].isStart = true
        grid[finishRow][finishCol].isFinish = true
        setGrid(grid)
    }, [])

    const handleMouseDown = (row:number, col: number) => {
        setMousePressed(true)
        const newGrid = updateGridWall(grid, row, col)
        setGrid(newGrid)
    }
    const handleMouseEnter = (row: number, col: number) => {
        if(!mousePressed) return
        const newGrid = updateGridWall(grid, row, col)
        setGrid(newGrid)
    }
    const handleMouseUp = () => {
        setMousePressed(false)
    }

    const animatePath = (path : SingleNode[]) => {
        for(let i = 0; i < path.length; i++){
            setTimeout(() => {
            let newGrid = grid.slice()
            const node = path[i]
            newGrid[node.row][node.col].isPath = true
                setGrid(newGrid)
            }, 10* i)
        } 
    }

    const animateAlgorithm = (nodeVisitedOrder: SingleNode[], path: SingleNode[]) => {
        for(let i = 0; i <= nodeVisitedOrder.length; i++){
            if(i === nodeVisitedOrder.length){
                setTimeout(() => {
                    animatePath(path)
                }, 10 * i)
                return
            }
            setTimeout(() => {
            let newGrid = grid.slice()
            const node = nodeVisitedOrder[i]
            newGrid[node.row][node.col].isVisited= true
                setGrid(newGrid)
            }, 10* i)
        }
    } 
    const handleVisualized = () => {
        const {nodeVisitedOrder, path, endReached} = BFS(grid, start, end)
        animateAlgorithm(nodeVisitedOrder, path)
        if(!endReached){
            alert('no path found')
            return 
        }
    }

    return (
        <div style={{ 
            height: '100px'
        }}>
            <button onClick={handleVisualized}>visulize</button>
        <div className="grid"
            onMouseLeave={() => { handleMouseUp() }}
            onMouseDown={() => { setMousePressed(true) }}
            onMouseUp={() => handleMouseUp()}
        >
            {grid.map((row, rowInd) => {
                return (
                    <div className='grid-row' key={rowInd}>
                        {row.map((node, colInd) => {
                            const { row, col } = node
                            return (
                                <Node
                                    key={colInd}
                                    node={node}
                                    mousePressed={mousePressed}
                                    onMouseDown={() => handleMouseDown(row, col)}
                                    onMouseEnter={() => handleMouseEnter(row, col)}
                                    onMouseUp={handleMouseUp}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default Board
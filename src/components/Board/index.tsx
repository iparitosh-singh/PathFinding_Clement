import React, { useEffect, useState} from 'react'
import Node from '../Node'
import './Board.css'
import BFS from '../../algorithms/bfsSearch'
import {algorithmNode, cordinate} from '../../interfaces'

const HIEGHT = 30
const WIDTH = 50

type NodeHandle = React.ElementRef<typeof Node>
interface gridNode {
    row: number,
    col: number,
    ref: any
}


const Board : React.FC = () => {
    const [isMousePressed, setIsMousePressed] = useState<boolean>(false)
    const [grid, setGrid] = useState<gridNode[][]>([])
    const [start] = useState<cordinate>({
        row: Math.floor(HIEGHT / 2),
        col: Math.floor(WIDTH / 4)
    })
    const [finish] = useState<cordinate>({
        row: Math.floor(HIEGHT / 2),
        col: Math.floor(3 * WIDTH / 4)
    })
    const makeGrid = (): void => {
        const newGrid: gridNode[][] = []
        for (let i = 0; i < HIEGHT; i++) {
            const gridRow: gridNode[] = []
            for (let j = 0; j < WIDTH; j++) {
                const node: gridNode = {
                    row: i,
                    col: j,
                    ref: React.createRef<NodeHandle>()
                }
                gridRow.push(node)
            }
            newGrid.push(gridRow)
        }
        setGrid(newGrid)
    }

    useEffect(() => {
        makeGrid()
    }, [])

    const handleMouseDown = (row: number, col: number) : void => {
        setIsMousePressed(true)
        const nodeRef = grid[row][col].ref
        const nodeState = nodeRef.current.state
        if(nodeState !== 'start' && nodeState !== 'end'){
            nodeRef.current.changeStatus('unweighted-wall')
        }
    }
    const handleMouseEnter = (row: number, col: number): void => {
        if(!isMousePressed) return 
        const nodeRef = grid[row][col].ref
        const nodeState = nodeRef.current.state
        if(nodeState !== 'start' && nodeState !== 'end'){
            nodeRef.current.changeStatus('unweighted-wall')
        }
    }

    const handleMouseUp = (event: React.MouseEvent) : void => {
        setIsMousePressed(false)
    }

    const animatePath = (path: algorithmNode[]): void => {
        for(let i = 0; i < path.length; i++){
            setTimeout(() => {
                const node = path[i]
                const nodeRef = grid[node.row][node.col].ref.current
                nodeRef.changeStatus('path')
            }, 20 * i)
        }
    }

    const aninimateVisitedNode = (nodeVisitedOrder: algorithmNode[], path: algorithmNode[] | undefined, endReached: boolean): void => {
        for(let i = 0; i <= nodeVisitedOrder.length; i++){
            if(i === nodeVisitedOrder.length){
                setTimeout(() => {
                    if(endReached && path) animatePath(path)
                    else alert('no path found')
                }, 5 * i)
                return 
            }
            setTimeout(() => {
                const node = nodeVisitedOrder[i]
                const nodeRef = grid[node.row][node.col].ref.current
                nodeRef.changeStatus('visited')
            }, 5 * i)
        }
    }

    const handleVisualize = (): void => {
        const nodeGrid: algorithmNode[][] = []
        for(let i = 0; i < grid.length; i++){
            let nodeRow : algorithmNode[] = []
            for(let j = 0; j < grid[i].length; j++){
                let newNode : algorithmNode = {
                    row: i,
                    col: j,
                    status: grid[i][j].ref.current.status,
                    previousNode: undefined 
                }
                nodeRow.push(newNode)
            }
            nodeGrid.push(nodeRow)
        }
        const {endReached, path, nodeVisitedOrder} = BFS(nodeGrid, start, finish)
        aninimateVisitedNode(nodeVisitedOrder, path, endReached)
    }
    return (
        <div>
            <button onClick={handleVisualize}>Visualize</button>
            <div className="grid"
                onMouseDown={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setIsMousePressed(true)
                }}
                onMouseLeave={handleMouseUp}
            >
                {grid.map((row, rowInd) => {
                    return (
                        <div className='grid-row' key={rowInd}>
                            {row.map((node, colInd) => {
                                const { row, col, ref } = node
                                return (
                                    <Node
                                        start={start}
                                        finish={finish}
                                        ref={ref}
                                        key={colInd} 
                                        row={row}
                                        col={col}
                                        onMouseDown={handleMouseDown}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseUp={handleMouseUp}
                                    ></Node>
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
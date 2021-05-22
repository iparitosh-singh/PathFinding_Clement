import React, { useEffect, useState} from 'react'
import Node from '../Node'
import './Board.css'
import BFS from '../../algorithms/bfsSearch'
import {algorithmNode, cordinate, BoardProps} from '../../interfaces'


type NodeHandle = React.ElementRef<typeof Node>

interface gridNode {
    row: number,
    col: number,
    ref: React.RefObject<NodeHandle> 
    isStart: boolean,
    isFinish: boolean
}


const Board : React.FC<BoardProps> = (props) => {
    const {height, width} = props
    const [nodePressed, setNodePressed] = useState<string>('')
    const [isMousePressed, setIsMousePressed] = useState<boolean>(false)
    const [grid, setGrid] = useState<gridNode[][]>([])
    const [initStart] = useState<cordinate>({
        row: Math.floor(height / 2),
        col: Math.floor(width / 4)
    })
    const [initFinish] = useState<cordinate>({
        row: Math.floor(height / 2),
        col: Math.floor(3 * width / 4)
    })
    const [start, setStart] = useState<cordinate>()
    const [finish, setFinish] = useState<cordinate>()
    useEffect(() => {
        const makeGrid = (): gridNode[][] => {
            const newGrid: gridNode[][] = []
            for (let i = 0; i < height; i++) {
                const gridRow: gridNode[] = []
                for (let j = 0; j < width; j++) {
                    const node: gridNode = {
                        row: i,
                        col: j,
                        ref: React.createRef<NodeHandle>(),
                        isStart: false,
                        isFinish: false
                    }
                    if (i === initStart.row && j === initStart.col) {
                        node.isStart = true
                    }
                    else if (i === initFinish.row && j === initFinish.col) {
                        node.isFinish = true
                    }
                    gridRow.push(node)
                }
                newGrid.push(gridRow)
            }
            return newGrid
        }
        setStart(initStart)
        setFinish(initFinish)
        setGrid(makeGrid())
    }, [height, width, initStart, initFinish])

    const handleMouseDown = (row: number, col: number) : void => {
        setIsMousePressed(true)
        const nodeRef = grid[row][col].ref
        const nodeState = nodeRef.current?.status
        if(nodeState) 
            setNodePressed(nodeState)
            
        if(nodeState !== 'start' && nodeState !== 'finish'){
            changeNormal(grid[row][col], 'unweighted-wall')
        }
    }

    const handleMouseEnter = (row: number, col: number): void => {
        if (!isMousePressed) return
        const nodeRef = grid[row][col].ref
        const nodeState = nodeRef.current?.status
        if (nodePressed !== 'start' && nodePressed !== 'finish') {
            if (nodeState !== 'start' && nodeState !== 'finish') {
                changeNormal(grid[row][col], 'unweighted-wall')
            }
        }
        else {
            if(nodePressed === 'start')
                setStart({row, col})
            if(nodePressed === 'finish')
                setFinish({row, col})
            nodeRef.current?.changeStatus(nodePressed)
        }
    }
    const handleMouseLeave = (row: number, col: number) => {
        if (!isMousePressed) return
        if (nodePressed !== 'start' && nodePressed !== 'finish') return
        const nodeRef = grid[row][col].ref
        const prevStatus = nodeRef.current?.prevState
        if (prevStatus)
            nodeRef.current?.changeStatus(prevStatus)
    }


    const handleMouseUp = (event: React.MouseEvent) : void => {
        setIsMousePressed(false)
    }

    const animatePath = (path: algorithmNode[]): void => {
        for(let i = 0; i < path.length; i++){
            setTimeout(() => {
                const node = path[i]
                const nodeRef = grid[node.row][node.col].ref
                nodeRef.current?.changeStatus('path')
            }, 20 * i)
        }
    }

    const aninimateVisitedNode = (nodeVisitedOrder: algorithmNode[], path: algorithmNode[] | undefined, endReached: boolean): void => {
        for(let i = 0; i <= nodeVisitedOrder.length; i++){
            if(i === nodeVisitedOrder.length){
                setTimeout(() => {
                    if(endReached && path) animatePath(path)
                    else alert('no path found')
                }, 20 * i)
                return 
            }
            setTimeout(() => {
                const node = nodeVisitedOrder[i]
                const nodeRef = grid[node.row][node.col].ref
                nodeRef.current?.changeStatus('visited')
            }, 20 * i)
        }
    }
    const changeNormal = (node: gridNode, status: string): void => {
        const nodeRef = grid[node.row][node.col].ref
        nodeRef.current?.changeStatus(status)
    }

    const handleVisualize = (): void => {
        const nodeGrid: algorithmNode[][] = []
        for(let i = 0; i < grid.length; i++){
            let nodeRow : algorithmNode[] = []
            for(let j = 0; j < grid[i].length; j++){
                const nodeRef = grid[i][j].ref
                if(nodeRef && nodeRef.current?.status){
                    let newNode: algorithmNode = {
                        row: i,
                        col: j,
                        status: nodeRef.current?.status,
                        previousNode: undefined
                    }
                    nodeRow.push(newNode)
                }
            }
            nodeGrid.push(nodeRow)
        }

        if(start && finish){
            const { endReached, path, nodeVisitedOrder } = BFS(nodeGrid, start, finish)
            aninimateVisitedNode(nodeVisitedOrder, path, endReached)
        }
    }

    
    return (
        <div>
            <button onClick={handleVisualize}>Visualize</button>
            <div className="grid"
                onMouseDown={(e: React.MouseEvent) => {
                    e.preventDefault()
                    setIsMousePressed(true)
                }}
            >
                {grid.map((row, rowInd) => {
                    return (
                        <div className='grid-row' key={rowInd}>
                            {row.map((node, colInd) => {
                                const { row, col, ref } = node
                                return (
                                    <Node
                                        isStart={initStart}
                                        isFinish={initFinish}
                                        ref={ref}
                                        key={colInd} 
                                        row={row}
                                        col={col}
                                        onMouseDown={handleMouseDown}
                                        onMouseUp={handleMouseUp}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
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
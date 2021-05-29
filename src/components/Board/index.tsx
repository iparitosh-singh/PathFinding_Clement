import React, { useCallback, useEffect, useState } from 'react'
import Node from '../Node'
import './Board.css'
import { algorithmNode, cordinate, BoardProps } from '../../interfaces'
import {changeNormal, getStatus, getNodeVistedOrder, algorithms } from '../helper'
import useMemoizedCallback from '../../hooks/useMemoizedCallback'


export type NodeHandle = React.ElementRef<typeof Node>
export interface gridNode {
    row: number,
    col: number,
    ref: React.RefObject<NodeHandle>
    isStart: boolean,
    isFinish: boolean
}


const Board: React.FC<BoardProps> = (props) => {
    const { height, width } = props
    const [nodePressed, setNodePressed] = useState<string>('')
    const [selectedAlgo, setSelectedAlgo] = useState<number>(0)
    const [grid, setGrid] = useState<gridNode[][]>([])
    const [initStart] = useState<cordinate>({
        row: Math.floor(height / 2),
        col: Math.floor(width / 4)
    })
    const [initFinish] = useState<cordinate>({
        row: Math.floor(height / 2),
        col: Math.floor(3 * width / 4)
    })

    const makeGrid = useCallback((): gridNode[][] => {
        const { height, width } = props
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
                gridRow.push(node)
            }
            newGrid.push(gridRow)
        }
        return newGrid
    }, [props])

    useEffect(() => {
        setGrid(makeGrid())
    }, [makeGrid])
    const handleMouseDown = useMemoizedCallback((row: number, col: number): void => {
        const nodeRef = grid[row][col]
        const nodeState = getStatus(nodeRef) 
        if (nodeState)
            setNodePressed(nodeState)

        if (nodeState !== 'start' && nodeState !== 'finish') {
            changeNormal(nodeRef, 'unweighted-wall')
        }
    }, [setNodePressed, grid])

    const handleMouseEnter = useMemoizedCallback((event: React.MouseEvent, row: number, col: number): void => {
        if (event.buttons !== 1) return
        const nodeRef = grid[row][col].ref
        const nodeState = nodeRef.current?.status
        if (nodePressed !== 'start' && nodePressed !== 'finish') {
            if (nodeState !== 'start' && nodeState !== 'finish') {
                changeNormal(grid[row][col], 'unweighted-wall')
            }
        }
        else {
            nodeRef.current?.changeStatus(nodePressed)
        }
    }, [grid, nodePressed])

    const handleMouseLeave = useMemoizedCallback((event: React.MouseEvent, row: number, col: number): void => {
        if (event.buttons !== 1) return
        if (nodePressed !== 'start' && nodePressed !== 'finish') return
        const nodeRef = grid[row][col]
        const prevStatus = nodeRef.ref.current?.prevState
            changeNormal(nodeRef, prevStatus)
    }, [grid, nodePressed])



    const animatePath = (path: algorithmNode[]): void => {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const { row, col } = path[i];
                if(i === 0)
                    changeNormal(grid[row][col], "start-path")
                else if(i === path.length - 1)
                    changeNormal(grid[row][col], "finish-path")
                else
                    changeNormal(grid[row][col], "path")
            }, 20 * i);
        }
    };

    const aninimateVisitedNode = (
        nodeVisitedOrder: algorithmNode[],
        path: algorithmNode[],
        endReached: boolean
    ): void => {
        for (let i = 0; i <= nodeVisitedOrder.length; i++) {
            if (i === nodeVisitedOrder.length) {
                setTimeout(() => {
                    if (endReached) animatePath(path);
                    else alert("no path found");
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const { row, col } = nodeVisitedOrder[i];
                const nodeRef = grid[row][col];
                const nodeStatus = getStatus(nodeRef)
                if(nodeStatus === 'start'){
                    changeNormal(nodeRef, 'start-visited')
                }
                else if(nodeStatus === 'finish'){
                    changeNormal(nodeRef, 'finish-visited')
                }
                else 
                changeNormal(nodeRef, 'visited')
            }, 10 * i);
        }
    };

    const handleVisualize = (): void => {
        const { endReached, path, nodeVisitedOrder } = getNodeVistedOrder(0, grid)
        aninimateVisitedNode(nodeVisitedOrder, path, endReached)
    }

    const handleReset = (): void => {
        grid.forEach(row => {
            row.forEach(node => {
                if(node.row === initStart.row && node.col === initStart.col){
                    changeNormal(node, 'start')
                }
                else if(node.row === initFinish.row && node.col === initFinish.col){
                    changeNormal(node, 'finish')
                }
                else
                    changeNormal(node, '')
            })
        })
    }
    const handleAlgoSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedAlgo(parseInt(event.target.value))
    }
    return (
        <div>
            <button onClick={handleVisualize}>Visualize</button>
            <button onClick={handleReset}>Reset</button>
            <select onChange={handleAlgoSelect} value={selectedAlgo}>
                {algorithms.map((algo, index) => (<option key={index} value={index}>{algo.name}</option>))}
            </select>
            <div className="grid">
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
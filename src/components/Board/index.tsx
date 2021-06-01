import React, { useCallback, useEffect, useState } from 'react'
import Node from './Node'
import Navbar from '../Navbar'

import { cordinate, BoardProps } from '../../interfaces'
import {
    changeNormal,
    getStatus,
    getNodeVistedOrder,
    aninimateVisitedNode,
    remakingGrid,
    actionType
} from '../helper'
import useMemoizedCallback from '../../hooks/useMemoizedCallback'
import {nodeTypes} from '../types'

import './Board.scss'

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

    const handleMouseDown = useCallback((event: React.MouseEvent, row: number, col: number): void => {
        const node = grid[row][col]
        if(!node.ref.current) return
        const nodeState = getStatus(node) 
        if (nodeState)
            setNodePressed(nodeState)

        if (nodeState !== nodeTypes.START && nodeState !== nodeTypes.FINISH) {
            changeNormal(node, nodeTypes.WALL)
        }
    }, [setNodePressed, grid])

    const handleMouseEnter = useMemoizedCallback((event: React.MouseEvent, row: number, col: number): void => {
        if (event.buttons !== 1) return
        const node = grid[row][col]
        if(!node.ref.current) return
        const nodeState = getStatus(node) 
        if (nodePressed !== nodeTypes.START && nodePressed !== nodeTypes.FINISH) {
            if (nodeState !== nodeTypes.START && nodeState !== nodeTypes.FINISH) {
                changeNormal(grid[row][col], nodeTypes.WALL)
            }
        }
        else {
            node.ref.current.changeStatus(nodePressed)
        }
    }, [grid, nodePressed])

    const handleMouseLeave = useMemoizedCallback((event: React.MouseEvent, row: number, col: number): void => {
        if (event.buttons !== 1) return
        if (nodePressed !== nodeTypes.START && nodePressed !== nodeTypes.FINISH) return
        const node= grid[row][col]
        const prevStatus = node.ref.current?.prevState
        if(prevStatus)changeNormal(node, prevStatus)
        else changeNormal(node, nodeTypes.UNVISITED)
    }, [grid, nodePressed])




    const handleReset = (): void => {
        const cordinates = {start:initStart, finish: initFinish}
        remakingGrid(actionType.resetFull, grid, cordinates)
    }

    const handleRedoAlgo = (): void => {
        remakingGrid(actionType.reset, grid)
    }

    const handleVisualize = (): void => {
        const { endReached, path, nodeVisitedOrder } = getNodeVistedOrder(selectedAlgo, grid)
        aninimateVisitedNode(nodeVisitedOrder, path, endReached, grid)
    }
    const handleAlgoSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedAlgo(parseInt(event.target.value))
    }
    return (
        <div>
            <Navbar 
                handleAlgoSelect={handleAlgoSelect}
                handleRedoAlgo={handleRedoAlgo}
                handleVisualize={handleVisualize}
                handleReset={handleReset}
                selectedAlgo={selectedAlgo}
            />
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
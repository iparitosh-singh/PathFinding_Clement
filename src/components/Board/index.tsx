import React, { useCallback, useEffect, useState } from 'react'
import Node from './Node'
import Navbar from '../Navbar'

import { BoardProps } from '../../interfaces'
import {
    changeNormal,
    getStatus,
    getNodeVistedOrder,
    aninimateVisitedNode,
    remakingGrid,
    actionType,
    animatePath,
    checkSpecialNode,
} from '../helper'
import useMemoizedCallback from '../../hooks/useMemoizedCallback'
import {nodeTypes} from '../../interfaces/types'

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
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [nodePressed, setNodePressed] = useState<nodeTypes>(nodeTypes.NODE)
    const [selectedAlgo, setSelectedAlgo] = useState<number>(0)
    const [grid, setGrid] = useState<gridNode[][]>([])
    const [initStart, setInitStart] = useState({
        row: Math.floor(height / 2),
        col: Math.floor(width / 4)
    })
    const [initFinish, setInitFinsish] = useState({
        row: Math.floor(height / 2),
        col: Math.floor(3 * width / 4)
    })


    const makeGrid = useCallback((): gridNode[][] => {
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
    }, [height, width])

    useEffect(() => {
        setGrid(makeGrid())
        setInitStart({
            row: Math.floor(height / 2),
            col: Math.floor(width / 4)
        })
        setInitFinsish({
            row: Math.floor(height / 2),
            col: Math.floor(3 * width / 4)
        })
    }, [makeGrid, height, width])

    const handleMouseDown = useMemoizedCallback((event: React.MouseEvent, row: number, col: number): void => {
        if(isRunning) return
        const node = grid[row][col]
        if(!node.ref.current) return
        const nodeState = getStatus(node) 
        if (nodeState){
           setNodePressed(nodeState)
            if (checkSpecialNode(nodeState)) {
                changeNormal(node, nodeTypes.WALL)
            }
        }
    }, [grid, isRunning, setNodePressed ])

    const handleMouseUp = useMemoizedCallback((event: React.MouseEvent, row: number, col:number) => {
        setNodePressed(nodeTypes.NODE)
    }, [])

    const handleMouseEnter = useMemoizedCallback((event: React.MouseEvent, row: number, col: number): void => {
        if (event.buttons !== 1 || isRunning) return
        const node = grid[row][col]
        if (!node.ref.current) return
        const nodeState = getStatus(node)
        if(!nodeState) return
        if (checkSpecialNode(nodePressed)) {
            if (checkSpecialNode(nodeState)) {
                changeNormal(grid[row][col], nodeTypes.WALL)
            }
        }
        else {
            changeNormal(node, nodePressed)
        }
    }, [grid, isRunning, nodePressed])

    const handleMouseLeave = useMemoizedCallback((event: React.MouseEvent, row: number, col: number): void => {
        if (event.buttons !== 1 || isRunning) return
        if (checkSpecialNode(nodePressed)) return
        const node= grid[row][col]
        const prevStatus = node.ref.current?.prevState
        if(row === 0 || row === height - 1 || col === 0 || col === width - 1){
            const Element = event.relatedTarget as Element
            if(Element.className === 'container' || Element.className === 'grid-row'){
                return
            }
            else {
                if (prevStatus)
                    changeNormal(node, prevStatus)
                else
                    changeNormal(node, nodeTypes.UNVISITED)
            }
        }
        else {
            if (prevStatus)
                changeNormal(node, prevStatus)
            else
                changeNormal(node, nodeTypes.UNVISITED)
        }
        
    }, [grid, isRunning, nodePressed])


    const clearWallAndPath = (): void => {
        remakingGrid(actionType.resetFull, grid)
    }

    const handleRedoAlgo = (): void => {
        remakingGrid(actionType.reset, grid)
    }

    const handleVisualize = async (): Promise<void> => {
        if(isRunning) return
        setIsRunning(true)
        const { endReached, path, nodeVisitedOrder } = getNodeVistedOrder(selectedAlgo, grid)
        await aninimateVisitedNode(nodeVisitedOrder, grid, 2)
        if(endReached)
            await animatePath(path, grid, 40)
        setIsRunning(false)
    }
    const handleAlgoSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedAlgo(parseInt(event.target.value))
    }
    return (
        <>
            <Navbar
                handleAlgoSelect={handleAlgoSelect}
                handleRedoAlgo={handleRedoAlgo}
                handleVisualize={handleVisualize}
                handleReset={clearWallAndPath}
                selectedAlgo={selectedAlgo}
                isRunning={isRunning}
            />
            <div className="container">
                <div>
                    This is the discription text of the algorithms
                </div>
                <div className="grid"
                onMouseLeave={() => {setNodePressed(nodeTypes.UNVISITED)}}
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
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseUp={handleMouseUp}
                                        ></Node>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Board
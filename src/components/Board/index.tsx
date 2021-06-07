import React, { useCallback, useEffect, useState } from 'react'
import Node from './Node'
import Navbar from '../Navbar'

import { BoardProps, gridNode } from '../../interfaces'
import {
    changeNormal,
    getStatus,
    getNodeVistedOrder,
    aninimateVisitedNode,
    remakingGrid,
    animatePath,
    checkStart,
    checkFinish,
//    redoAlog
} from '../helper'

import useMemoizedCallback from '../../hooks/useMemoizedCallback'
import {nodeTypes, actionType } from '../../interfaces/constants'

import './Board.scss'

export type NodeHandle = React.ElementRef<typeof Node>


const Board: React.FC<BoardProps> = (props) => {
    const { height, width } = props
    const [algoDone, setAlgoDone] = useState<boolean>(false)
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

    const handleMouseDown = useMemoizedCallback((_: React.MouseEvent, row: number, col: number): void => {
        if (isRunning) return
        const nodeState = getStatus(grid[row][col])
        setNodePressed(nodeState)
        if (!checkStart(nodeState) && !checkFinish(nodeState)) {
            if (nodeState === nodeTypes.WALL)
                changeNormal(grid[row][col], nodeTypes.UNVISITED)
            else
                changeNormal(grid[row][col], nodeTypes.WALL)
        }
    }, [])


    const handleMouseEnter = useMemoizedCallback(async (event: React.MouseEvent, row: number, col: number): Promise<void> => {
        if (event.buttons !== 1 || isRunning) return
        const nodeState = getStatus(grid[row][col])
        if (!checkStart(nodePressed) && !checkFinish(nodePressed)) {
            if (!checkStart(nodeState) && !checkFinish(nodeState)) {
                changeNormal(grid[row][col], nodeTypes.WALL)
            }
        }
        //if the start/finish node is special node
        else {
            if (!checkStart(nodeState) && !checkFinish(nodeState)) {
                await changeNormal(grid[row][col], nodePressed)
                if (algoDone) {
                    //redoAlog(grid, selectedAlgo)
                }

            }
        }
    }, [])

    const handleMouseUp = useCallback((): void => {
        setNodePressed(nodeTypes.UNVISITED)
    }, [])

    const handleMouseLeave = useMemoizedCallback((event: React.MouseEvent, row: number, col: number): void => {
        if (event.buttons !== 1 || isRunning)
            return
        if (!checkStart(nodePressed) && !checkFinish(nodePressed))
            return
        const node = grid[row][col]
        if(!node.ref.current)
            return

        //dont change if goinf out of the grid
        const prevStatus = node.ref.current.prevState
        const nextElement = event.relatedTarget as HTMLElement
        const nextNodeClasses = nextElement.className.split(' ')
        if (nextNodeClasses[0] !== 'node' || nextNodeClasses[1] === 'start' || nextNodeClasses[1] === 'finish'){
            setNodePressed(nodeTypes.UNVISITED)
            return
        }
        if(!algoDone)
            changeNormal(node, prevStatus)
    }, [])


    const clearWallAndPath = (): void => {
        remakingGrid(actionType.resetFull, grid)
        setAlgoDone(false)
    }

    const handleRedoAlgo = (): void => {
        remakingGrid(actionType.reset, grid)
        setAlgoDone(false)
    }

    const handleVisualize = async (): Promise<void> => {
        if(isRunning) return
        setIsRunning(true)
        const { endReached, path, nodeVisitedOrder } = getNodeVistedOrder(selectedAlgo, grid)
        await aninimateVisitedNode(nodeVisitedOrder, grid, 2)
        if(endReached)
            await animatePath(path, grid, 10)
        setIsRunning(false)
        setAlgoDone(true)
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

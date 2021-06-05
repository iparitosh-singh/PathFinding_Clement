import React from "react";
import { gridNode, NodeHandle } from "../components/Board";
import { algoName } from "../components/types";

export interface NavProps {
    handleReset: () => void,
    handleAlgoSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
    handleVisualize: () => void,
    handleRedoAlgo: () => void,
    selectedAlgo: number
    isRunning: boolean
}
export interface algorithmNode{
    status: string,
    row: number,
    col: number,
    distance: number,
    previousNode: undefined | algorithmNode
    weight: number,
    isWall: boolean,
    heuristicDistance: number 
}



export interface returnValue {
    nodeVisitedOrder : algorithmNode[]
    path: algorithmNode[],
    endReached: boolean 
}

export interface BoardProps {
    height: number,
    width: number
}

export interface NodeProps {
    isStart: {row: number, col: number}
    isFinish: {row: number, col: number}
    row: number,
    col: number,
    key: number,
    onMouseDown: (event: React.MouseEvent, row: number, col: number) => void
    onMouseEnter: (event: React.MouseEvent, row: number, col: number) => void
    onMouseLeave: (event:React.MouseEvent, row: number, col: number) => void
    onMouseUp: (event:React.MouseEvent, row: number, col: number) => void
    ref: React.RefObject<NodeHandle>,
}

export interface algoType {
        name: algoName,
        algorithm: (
            grid: algorithmNode[][],
            start: algorithmNode,
            finish: algorithmNode
        ) => returnValue
}

import React from "react";

export interface algorithmNode{
    status: string,
    row: number,
    col: number,
    previousNode: undefined | algorithmNode
}

export interface cordinate {
    row: number, col: number
}

export interface returnValue {
    nodeVisitedOrder : algorithmNode[]
    path: algorithmNode[] | undefined,
    endReached: boolean 
}

export interface BoardProps {
    height: number,
    width: number
}

export interface NodeProps {
    isStart: cordinate,
    isFinish: cordinate,
    row: number,
    col: number,
    key: number,
    onMouseDown: (row: number, col: number) => void
    onMouseUp: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseEnter: (row: number, col: number) => void
    onMouseLeave: (row: number, col: number) => void
    ref: any
}
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

export interface NodeProps {
    start: cordinate,
    finish: cordinate,
    row: number,
    col: number,
    key: number,
    onMouseDown: (row: number, col: number) => void
    onMouseEnter: (row: number, col: number) => void
    onMouseUp: (event: React.MouseEvent<HTMLDivElement>) => void
    ref: any
}
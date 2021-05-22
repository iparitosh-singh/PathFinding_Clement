import React, { useState, useImperativeHandle, useEffect } from 'react'
import './Node.css'
import { NodeProps } from '../../interfaces'

const getClassNameFromStatus = (newStatus: string): string => {
    let newClassName = 'node'
    switch(newStatus){
        case 'unweighted-wall': 
            newClassName += '-wall'
            break
        case 'weighted-wall':
            newClassName += '-weighted-wall'
            break
        case 'visited':
                newClassName += '-visited'
            break
        case 'path': 
                newClassName += '-path'
            break
        case 'unVisited':
            break
        case 'start':
                newClassName += '-start'
            break
        case 'finish':
                newClassName += '-end'
            break
    }
    return newClassName 
}

export interface NodeHandle {
    changeStatus: (status: string) => void,
    status: string,
    prevState: string
}

const Node: React.ForwardRefRenderFunction<NodeHandle, NodeProps> = (props, ref) => {
    const [className, setClassName] = useState<string>('node')
    const [prevState, setPrevState] = useState<string>('univisted')
    const [status, setStatus] = useState<string>('unvisited')
    const {isStart, isFinish, row, col} = props

    useEffect(() => {
        let status = 'unvisited'
        if(isStart.row === row && isStart.col === col){
            status = 'start'
        }
        else if(isFinish.row === row && col === isFinish.col){
            status = 'finish'
        }
        setStatus(status)
        setClassName(getClassNameFromStatus(status))
    }, [isStart, isFinish, row, col])

    const changeStatus = (newStatus: string): void => {
        setClassName(getClassNameFromStatus(newStatus))
        setPrevState(status)
        setStatus(newStatus)
    }

    useImperativeHandle(ref, () => {
        return {
            changeStatus,
            status,
            prevState
        }
    })
    return (
        <div className={className} 
            onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
                props.onMouseDown(props.row, props.col)
            }}
            onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
            onMouseUp={props.onMouseUp}
            onMouseLeave={() => props.onMouseLeave(props.row, props.col)}
        >
        </div>
    )
}

export default React.forwardRef(Node)
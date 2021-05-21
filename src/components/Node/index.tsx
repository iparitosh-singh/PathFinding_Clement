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
    status: string
}

const Node: React.ForwardRefRenderFunction<NodeHandle, NodeProps> = (props, ref) => {
    const [className, setClassName] = useState<string>('node')
    const [status, setStatus] = useState<string>('unvisited')

    useEffect(() => {
        if(props.start.row === props.row && props.start.col === props.col){
            changeStatus('start')
        }
        if(props.finish.row === props.row && props.finish.col === props.col){
            changeStatus('finish')
        }
    }, [props])

    const changeStatus = (status: string): void => {
        setClassName(getClassNameFromStatus(status))
        setStatus(status)
    }

    useImperativeHandle(ref, () => {
        return {
            changeStatus,
            status,
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
        >
        </div>
    )
}

export default React.forwardRef(Node)
import React, { 
    useState, 
    useImperativeHandle, 
    useEffect,
    memo, 
    forwardRef, 
} from 'react'

import './Node.css'
import { NodeProps } from '../../interfaces'
import { getClassNameFromStatus } from '../helper'


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
            onMouseEnter={(event => props.onMouseEnter(event, props.row, props.col))}
            onMouseLeave={(event) => props.onMouseLeave(event, props.row, props.col)}
        >
        </div>
    )
}

export default memo(forwardRef(Node))
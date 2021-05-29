import React, { 
    useState, 
    useImperativeHandle, 
    useEffect,
    memo, 
    forwardRef, 
} from 'react'
import './Node.css'
import { NodeProps } from '../../interfaces'
import * as nodeTypes from '../nodeType'


export interface NodeHandle {
    changeStatus: (status: string) => void,
    status: string,
    prevState: string
}

const Node: React.ForwardRefRenderFunction<NodeHandle, NodeProps> = (props, ref) => {
    const [prevState, setPrevState] = useState<string>(nodeTypes.UNVISITED)
    const [status, setStatus] = useState<string>(nodeTypes.UNVISITED)
    const {isStart, isFinish, row, col} = props

    useEffect(() => {
        let status = nodeTypes.UNVISITED
        if(isStart.row === row && isStart.col === col){
            status = nodeTypes.START 
        }
        else if(isFinish.row === row && col === isFinish.col){
            status = nodeTypes.FINISH
        }
        setStatus(status)
    }, [isStart, isFinish, row, col])

    const changeStatus = (newStatus: string): void => {
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
        <div className={`node ${status}`} 
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
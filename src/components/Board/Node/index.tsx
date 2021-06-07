import React, {
    useState,
    useImperativeHandle,
    useEffect,
    memo,
    forwardRef,
} from 'react'
import './Node.scss'
import { NodeProps } from '../../../interfaces'
import { nodeTypes } from '../../../interfaces/constants'


export interface NodeHandle {

    changeStatus: (newStatus: nodeTypes) => void,
    status: nodeTypes,
    prevState: nodeTypes,
    setPrevState:React.Dispatch<React.SetStateAction<nodeTypes>>
}
const Node: React.ForwardRefRenderFunction<NodeHandle, NodeProps> = (props, ref) => {
    const [prevState, setPrevState] = useState<nodeTypes>(nodeTypes.UNVISITED)
    const [status, setStatus] = useState<nodeTypes>(nodeTypes.UNVISITED)
    const {isStart, isFinish, row, col} = props
    useEffect(() => {
        let status = nodeTypes.UNVISITED
        if (isStart.row === row && isStart.col === col) {
            status = nodeTypes.START
        }
        else if (isFinish.row === row && col === isFinish.col) {
            status = nodeTypes.FINISH
        }
        setStatus(status)
    }, [row, col, isStart, isFinish])


    const changeStatus = (newStatus: nodeTypes): void => {
        setPrevState(status)
        setStatus(newStatus)
    }

    useImperativeHandle(ref, () => {
        return {
            changeStatus,
            status,
            prevState,
            setPrevState
        }
    })
    return (
        <div className="node-container"
            onMouseDown={(event: React.MouseEvent) => {
                event.preventDefault()
                props.onMouseDown(event, props.row, props.col)
            }}
            onMouseEnter={(event => props.onMouseEnter(event, props.row, props.col))}
            onMouseLeave={(event) => props.onMouseLeave(event, props.row, props.col)}

        >
            <div className={`node ${status}`}>
            </div>
        </div>
    )
}

export default memo(forwardRef(Node))

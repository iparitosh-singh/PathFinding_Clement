import React, { useEffect, useState } from 'react'
import './Node.css'
import {SingleNode} from '../../interfaces/gridInterfaces'

interface NodeProps {
    key: number,
    node: SingleNode,
    mousePressed: boolean,
    onMouseEnter: (row: number, col:number) => void, 
    onMouseDown: (row: number, col:number) => void
    onMouseUp: () => void
}
const Node : React.FC<NodeProps> = (props) => {
    const [className, setClassName] = useState<string>('node')
    const {node, onMouseDown, onMouseEnter, onMouseUp} = props
    const {row, col} = node

    useEffect(() => {
        if(node.isStart){
            setClassName('node-start')
        }
        else if(node.isFinish){
            setClassName('node-end')
        }
        else if (node.isWall){
            setClassName('node-wall')
        }
        if(node.isVisited && !(node.isFinish || node.isStart)){
            setClassName('node-visited')
        }
        if(node.isPath){
            setClassName('node-path')
        }
    }, [node, props])
    return (
        <div
            className={className}
            onMouseDown={() => {onMouseDown(row, col)}}
            onMouseEnter={() => {onMouseEnter(row, col)}}
            onMouseUp={() => onMouseUp()}
        >
        </div>
    )
} 

export default Node
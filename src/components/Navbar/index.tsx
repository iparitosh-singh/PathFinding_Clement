import React from 'react'
import {algorithms} from '../../interfaces/constants'
import {NavProps} from '../../interfaces'
import './Navbar.scss'

const Navbar: React.FC<NavProps> = (props) => {
    const {
        handleAlgoSelect,
        handleRedoAlgo,
        handleReset,
        handleVisualize,
        selectedAlgo,
        isRunning,
        algoDone
    } = props

    const running = isRunning || algoDone ? 'running' : ''
    const disabled = isRunning ? 'disabled' : ''
    return (
        <>
            <div className='navbar'>
                <div className='heading'>PathFinding Visualizer</div>
                <div className="items">
                    <select onChange={handleAlgoSelect} value={selectedAlgo} className='dropDown' >
                        {algorithms.map((algo, index) => (<option key={index} value={index}>{algo.name}</option>))}
                    </select>
                    <button className={"btn visualize " + running} onClick={() => {if(!running) handleVisualize()}}>Visualize</button>
                    <button className={"btn " + disabled} onClick={handleRedoAlgo}>ClearAlgo</button>
                    <button className={"btn " + disabled} onClick={handleReset}>Clear</button>
                </div>
            </div>
        </>
    )

}

export default Navbar

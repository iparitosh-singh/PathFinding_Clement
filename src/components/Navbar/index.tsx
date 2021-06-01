import React from 'react'
import {algorithms} from '../helper'
import './Navbar.scss'

interface NavProps {
    
    handleReset: () => void,
    handleAlgoSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
    handleVisualize: () => void,
    handleRedoAlgo: () => void,
    selectedAlgo: number
}
const Navbar: React.FC<NavProps> = (props) => {
    const {
        handleAlgoSelect,
        handleRedoAlgo,
        handleReset,
        handleVisualize,
        selectedAlgo
    } = props
    return (
        <div className='navbar'>
            <div className='heading'>PathFinding</div>
            <div className="items">
                <button className="btn visualise" onClick={handleVisualize}>Visualize</button>
                <button className="btn" onClick={handleReset}>Reset</button>
                <button className="btn" onClick={handleRedoAlgo}>ClearAlgo</button>
                <select onChange={handleAlgoSelect} defaultValue={selectedAlgo}>
                    {algorithms.map((algo, index) => (<option key={index} value={index}>{algo.name}</option>))}
                </select>
            </div>
        </div>
    )

}

export default Navbar
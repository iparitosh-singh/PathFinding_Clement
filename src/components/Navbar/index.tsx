import React, {useState} from 'react'
import {algorithms} from '../../interfaces/constants'
import {NavProps} from '../../interfaces'
import './Navbar.scss'
import sidebarIcon from '../../assets/sidebar.svg'

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

    const [sidebar, setSidebar] = useState<boolean>(false);
    const running = isRunning || algoDone ? 'running' : ''
    const disabled = isRunning ? 'disabled' : ''
const styles = sidebar ? {width: '100%'} : {width: '0', display: 'none'}
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
                    {!sidebar && <img
                        className="sidebar-icon"
                        src={sidebarIcon}
                        alt="sidebar"
                        onClick={() =>{
                            setSidebar(true)
                        }}
                    />}
                </div>
            </div>
            <div className="sidebar" style={styles}>
                <button onClick={() => {setSidebar(false)}}>x</button>
                <button onClick={() => {if(!running) handleVisualize()}}>Visualize</button>
                <button onClick={handleRedoAlgo}>ClearAlgo</button>
                <button onClick={handleReset}>Clear</button>
                <select onChange={handleAlgoSelect} value={selectedAlgo}>
                    {algorithms.map((algo, index) => (<option key={index} value={index}>{algo.name}</option>))}
                </select>
                    </div>
        </>
    )

}

export default Navbar

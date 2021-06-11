import React  from 'react'
import './Legends.scss'
import startLogo from '../../assets/icons/triangletwo-right.svg'
import finishLogo from '../../assets/icons/circle.svg'
const Legends: React.FC = () => {


  return (
    <div
      className="legend-container"
    >
      <div className="legend">
        <img alt='start' src={startLogo}/>
        <div>Start</div>
      </div>
      <div className="legend">
        <img alt='finish' src={finishLogo}/>
        <div>Target</div>
      </div>
      <div className="legend">
        <div className='wall'></div>
        <div>Wall</div>
      </div>
      <div className="legend">
        <div className='visited'></div>
        <div>Visited</div>
      </div>
      <div className="legend">
        <div className='path'></div>
        <div>Path</div>
      </div>
    </div>
  )
}

export default Legends

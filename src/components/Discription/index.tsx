import React from 'react'
import {algorithms, mazeAlgorithms} from '../../interfaces/constants'

interface DescriptionProps {
  selectedAlgo: number
  selectedMaze: number
}


const Description: React.FC<DescriptionProps> = (props) => {
  const style = {
    paddingRight: '1em',
    paddingLeft: '1em',
    paddingTop: '1em',
    fontFamily: 'Montserrat Alternates',
    fontSize: '1em',
    fontWieght: '700',
    WhiteSpace: 'nowrap'
  }
  const {selectedAlgo, selectedMaze} = props
  return(
    <div style={style}>
      {selectedAlgo === -1 && selectedMaze === -1 ? ('Select an algorithms to visualaise') :
        (selectedAlgo === -1 ? mazeAlgorithms[selectedMaze].text : algorithms[selectedAlgo].text)
      }
    </div>
  )
}

export default Description

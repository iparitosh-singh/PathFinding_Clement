import React from 'react'
import {algorithms} from '../../interfaces/constants'

interface DescriptionProps {
  selectedAlgo: number
}


const Description: React.FC<DescriptionProps> = (props) => {
  const style = {
    paddingTop: '1em',
    fontFamily: 'Montserrat Alternates',
    fontSize: '1em',
    fontWieght: '700'
  }
  return(
    <div style={style}>
      <div>{algorithms[props.selectedAlgo].text}</div>
    </div>
  )
}

export default Description

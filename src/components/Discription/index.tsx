import React from 'react'
import {algorithms} from '../../interfaces/constants'

interface DescriptionProps {
  selectedAlgo: number
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
  return(
    <div style={style}>
      {algorithms[props.selectedAlgo].text}
    </div>
  )
}

export default Description

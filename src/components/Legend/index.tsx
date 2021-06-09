import React, {useState, useEffect} from 'react'

interface LegendsType {
  selectedAlgo: number
}

const Legends: React.FC<LegendsType> = (props) => {
  const [currentAlgo, setCurrentAlgo] = useState<number>(0)
  const {selectedAlgo} = props

  useEffect(() => {
    setCurrentAlgo(selectedAlgo)
  }, [selectedAlgo])

  return (
    <div
      style={{ height: '50px'}}
    >
      {currentAlgo + 1}
      <div>
        This is the discription tent of the algorithms
      </div>
    </div>
  )
}

export default Legends

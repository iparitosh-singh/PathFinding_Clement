import React, {useState, useEffect} from 'react'
import Bar, {BarHandle} from './Bar'
import merge_sort from '../../algorithms/sorting_algorithms/quick_sort'
import './Sorting.scss'

const randomizeArray = (size: number): Array<number> => {
  let array = Array.from({length: size}, () => Math.floor(Math.random() * (500 - 10)) + 10)
  return array
}

interface ArrayNode {
  index: number,
  value: number,
  ref: React.RefObject<BarHandle>
}
const Sorting: React.FC = () => {
  const [array, setArray] = useState<ArrayNode[]>([])
  const [size, setSize] = useState<number>(50)
  const [currentAlgo, setCurrentAlgo] = useState<string>('merge_sort')
  const [isSorting] = useState<boolean>(false)

  useEffect(() => {
    const newArray: Array<ArrayNode> = randomizeArray(size).map((num, index) => {
      return {
        index: index,
        value: num,
        ref: React.createRef<BarHandle>()
      }
    })
    setArray(newArray)
  }, [size])

  const handleAlgoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentAlgo(e.target.value)
  }

  const handleSizeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if(!isSorting)
      setSize(e.target.valueAsNumber)
  }

  const handleSort =(e: React.MouseEvent) => {
    e.preventDefault()
    const nodeArray = array.map(bar => {
      return({
        value: bar.value,
        index: bar.index
      })
    })
   console.log(merge_sort(nodeArray))
  }

  return (
    <div className="sorting-container">
      <input
        type="range"
        min={20}
        max={500}
        step={1}
        value={size}
        onChange={handleSizeChange}
      />
      {size}
      <select name="sorting_algo" onChange={handleAlgoChange} value={currentAlgo}>
        <option value="merge_sort">Merge Sort </option>
      </select>
      <button onClick={handleSort}>Sort</button>
      <div className="array">
        {array.map((bar) => {
          const {value, ref, index} = bar
          return(
            <Bar height={value} key={index} ref={ref}/>
          )}
        )}
      </div>
    </div>
  )
}

export default Sorting
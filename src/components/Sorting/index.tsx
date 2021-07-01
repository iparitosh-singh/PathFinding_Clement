import React, {useState, useEffect} from 'react'
import Bar from './Bar'
import merge_sort from '../../algorithms/sorting_algorithms/heap_sort'
import { animateSort } from '../sorting_animations'
import {ArrayNode, BarHandle} from '../../interfaces/sortingInterfaces'
import {sortings} from '../../interfaces/constants'
import './Sorting.scss'

const randomizeArray = (size: number): Array<number> => {
  let array = Array.from({length: size}, () => Math.floor(Math.random() * (500 - 1)) + 1)
  return array
}

const Sorting: React.FC = () => {
  const [array, setArray] = useState<ArrayNode[]>([])
  const [size, setSize] = useState<number>(50)
  const [currentAlgo, setCurrentAlgo] = useState<number>(0)
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
    setCurrentAlgo(parseInt(e.target.value))
  }

  const handleSizeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if(!isSorting)
      setSize(e.target.valueAsNumber)
  }

  const handleSort =(e: React.MouseEvent) => {
    e.preventDefault()
    let nodeArray: Array<number> = []
    array.forEach(bar => nodeArray.push(bar.value))
    const {animations} =  sortings[currentAlgo].algorithm(nodeArray)
    animateSort(animations, array)
  }

  return (
    <div className="sorting-container" >
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
        {sortings.map((sort, index) => {
          return(<option value={index} key={index}>{sort.name}</option>)
        })}
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

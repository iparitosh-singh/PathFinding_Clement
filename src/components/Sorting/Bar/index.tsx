import React, {
  useImperativeHandle,
  useState,
  useEffect,
  forwardRef,
  memo
} from 'react'

import {BarProps, BarHandle} from '../../../interfaces/sortingInterfaces'

import './Bar.scss'



const Bar: React.ForwardRefRenderFunction<BarHandle, BarProps> = (props, ref) => {
  const [height, setHeight] = useState<number>(props.height)
  useEffect(() => {
    setHeight(props.height)
  }, [props.height])

  useImperativeHandle(ref, () => {
    return {
      height,
      changeHeight
    }
  })

  const changeHeight = (num: number) => {
    setHeight(num)
  }

  return (
    <div className="bar">
      <div style={{height: `${height / 5}%`}} className="bar-height" />
    </div>
  )
}

export default memo(forwardRef(Bar))

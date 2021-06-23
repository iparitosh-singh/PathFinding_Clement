import React, {
  useImperativeHandle,
  useState,
  useEffect,
  forwardRef,
  memo
} from 'react'
import './Bar.scss'


interface BarProps {
  height: number
  ref: React.RefObject<BarHandle>
}
export interface BarHandle {
  setHeight: React.Dispatch<React.SetStateAction<number>>
  height: number
}

const Bar: React.ForwardRefRenderFunction<BarHandle, BarProps> = (props, ref) => {
  const [height, setHeight] = useState<number>(props.height)
  useEffect(() => {
    setHeight(props.height)
  }, [props.height])

  useImperativeHandle(ref, () => {
    return {
      setHeight,
      height
    }
  })


  const style = {
    height:`${height / 5}%`,
  }
  return (
    <div className="bar">
      <div style={style} className="bar-height" />
    </div>
  )
}

export default memo(forwardRef(Bar))

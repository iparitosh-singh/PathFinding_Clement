import React, {useCallback, useEffect, useRef} from 'react'


type callback = (event: React.MouseEvent, row: number , col: number) => void
type callbackPromise = (event: React.MouseEvent, row: number , col: number) => Promise<void>;

//bomb hook
const useMemoizedCallback = (callback: callback | callbackPromise, inputs: any = []) => {
    const callbackRef = useRef(callback)

    const memoizedCallback = useCallback((event, row, col) => {
        return callbackRef.current(event, row, col)
    }, [])

    const updateCallback = useCallback(callback, [callback, ...inputs])
    useEffect(() => {
        callbackRef.current = updateCallback
    }, [inputs, updateCallback])

    return memoizedCallback
}

export default useMemoizedCallback

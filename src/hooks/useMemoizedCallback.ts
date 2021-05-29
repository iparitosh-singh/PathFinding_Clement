import {useCallback, useEffect, useRef} from 'react'

const useMemoizedCallback = (callback: any, inputs: any = []) => {
    const callbackRef = useRef(callback)

    const memoizedCallback = useCallback((...args) => {
        return callbackRef.current(...args)
    }, [])

    const updateCallback = useCallback(callback, [callback, ...inputs])
    useEffect(() => {
        callbackRef.current = updateCallback
    }, [inputs, updateCallback])

    return memoizedCallback
}

export default useMemoizedCallback
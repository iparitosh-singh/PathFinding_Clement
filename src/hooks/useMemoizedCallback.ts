import {useCallback, useEffect, useRef} from 'react'

//bomb hook
const useMemoizedCallback = function<T extends (...args: any[]) => any> (callback: T , deps: ReadonlyArray<any>){

    const callbackRef = useRef(callback)
    const memoizedCallback = useCallback((event, row, col) => {
        return callbackRef.current(event, row, col)
    }, [])

    const updateCallback = useCallback(callback, [callback, ...deps])

    useEffect(() => {
        callbackRef.current = updateCallback
    }, [deps, updateCallback])

    return memoizedCallback
}

export default useMemoizedCallback

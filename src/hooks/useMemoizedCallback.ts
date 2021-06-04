import React, {useCallback, useEffect, useRef} from 'react'


interface callbackInterface {
    (event: React.MouseEvent, row: number, col: number): void
}

//bomb hook

const useMemoizedCallback = <T extends callbackInterface>(callback: T, inputs: any = []) => {
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
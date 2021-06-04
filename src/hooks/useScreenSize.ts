import {useEffect, useState} from 'react'

const getWindowDimensions = (): {width: number, height: number} => {
    const {innerWidth: width, innerHeight: height} = window
    return {
        width,
        height
    }
}

const useWindowDimensions = (): {width: number, height: number} => {
    const [windowDimensions, setWindowDimensions] = useState<{width: number, height: number}>(getWindowDimensions())
    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions())
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return windowDimensions
}

export default useWindowDimensions
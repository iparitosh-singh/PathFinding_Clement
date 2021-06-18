import {useEffect, useState} from 'react'

const getWindowDimensions = (): {width: number, height: number} => {
    const {innerWidth: width, innerHeight: height} = window
    return {
        width,
        height
    }
}

const useWindowDimensions = (): {height: number, width: number}  => {
    const [width, setWidth] = useState<number>(61)
    const [height] = useState<number>(23)
    useEffect(() => {
        const handleResize = () => {
            const windowWidth = getWindowDimensions().width
            if(windowWidth < 400){
                setWidth(10)
            }
            else if (windowWidth < 600){
                setWidth(15)
            }
            else if(windowWidth < 800){
                setWidth(30)
            }
            else if(windowWidth < 1000){
                setWidth(45)
            }
            else if(windowWidth < 1200){
                setWidth(50)
            }
            else {
                setWidth(61)
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize() // run first time
        return () => window.removeEventListener('resize', handleResize)
    }, [width])
    return {height, width}
}

export default useWindowDimensions

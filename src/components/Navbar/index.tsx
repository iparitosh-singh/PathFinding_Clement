import React from 'react'

interface NavProps {
    handleReset?: () => void,
    handleAlgoSelect?: (event: React.ChangeEvent<HTMLSelectElement>) => void
    handleVisualize?: () => void,
    handleRedoAlgo?: () => void
}
const Navbar: React.FC<NavProps> = () => {
    return (
        <div>
            Hello World
        </div>
    )
    
}

export default Navbar
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Board from '../components/Board'
import Homepage from '../components/Homepage'
import useWindowDimensions from '../hooks/useScreenSize'



const MainRouter: React.FC = () => {
  const {height, width} = useWindowDimensions()
  return (
    <Switch>
        <Route exact path='/' >
          <Board height={height} width={width} />
        </Route>
        <Route exact path='/homepage' >
          <Homepage/>
        </Route>
    </Switch>
  )
}

export default MainRouter

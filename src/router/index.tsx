import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Board from '../components/Board'
import Homepage from '../components/Homepage'
import useWindowDimensions from '../hooks/useScreenSize'
import Sorting from '../components/Sorting'



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
        <Route exact path='/sorting' >
          <Sorting/>
        </Route>
    </Switch>
  )
}

export default MainRouter

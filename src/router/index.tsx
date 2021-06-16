import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Board from '../components/Board'
import Homepage from '../components/Homepage'



const MainRouter: React.FC = () => {
  const HEIGHT = 20, WIDTH = 60
  return (
    <Switch>
        <Route exact path='/' >
          <Board height={HEIGHT} width={WIDTH} />
        </Route>
        <Route exact path='/homepage' >
          <Homepage/>
        </Route>
    </Switch>
  )
}

export default MainRouter

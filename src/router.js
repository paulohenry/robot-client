import React from 'react';
import {BrowserRouter,Route,Switch}from 'react-router-dom'
import Home from './Pages/Home/index'
import TrainVoice from './Pages/TrainVoice/index'
import TrainVision from './Pages/TrainVision/index'

function Router() {
  return(
   <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/vision" component={TrainVision}/>
          <Route path="/voice"  component={TrainVoice} />
        </Switch>
   </BrowserRouter>
  )
}

export default Router;
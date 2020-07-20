import React from 'react';
import {BrowserRouter,Route,Switch}from 'react-router-dom'
import Home from './Pages/Home/home'
import TrainChat from './Pages/TrainChat/chat'
import TrainVision from './Pages/TrainVision/vision'

function Router() {
  return(
   <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/vision" component={TrainVision}/>
          <Route path="/voice"  component={TrainChat} />
        </Switch>
   </BrowserRouter>
  )
}

export default Router;
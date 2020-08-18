import React from 'react';
import {BrowserRouter,Route,Switch}from 'react-router-dom'
import Home from './Pages/Home/home'
import TrainChat from './Pages/TrainChat/chat'
import Config from './Pages/ConfigPage/index'
// import TrainVision from './Pages/TrainVision/vision'
import TensorFlowVision from './Pages/Tensor_Vision'

function Router() {
  return(
   <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/vision" component={TensorFlowVision}/>
          <Route path="/voice"  component={TrainChat} />
          <Route path="/config"  component={Config} />
        </Switch>
   </BrowserRouter>
  )
}

export default Router;
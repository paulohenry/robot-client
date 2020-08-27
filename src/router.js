import React from 'react';
import {BrowserRouter,Route,Switch}from 'react-router-dom'
import Home from './Pages/Home/home'
import TrainChat from './Pages/TrainChat/chat'
import Config from './Pages/ConfigPage/index'
// import TrainVision from './Pages/TrainVision/vision'
import Login from './Pages/Login/index'
import Lista from './Pages/Lista/index'
import Cadastro1 from './Pages/Cadastro/c1'
import Cadastro2 from './Pages/Cadastro/c2'
import Cadastro3 from './Pages/Cadastro/c3'
import Cadastro4 from './Pages/Cadastro/c4'
import Ip from './Pages/IpPage/index'
import TensorFlowVision from './Pages/Tensor_Vision'
import Motors from './Pages/Motors/index'
function Router() {
  return(
   <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Ip}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/lista" component={Lista}/>

          <Route exact path="/cadastro1" component={Cadastro1}/>
          <Route exact path="/cadastro2" component={Cadastro2}/>
          <Route exact path="/cadastro3" component={Cadastro3}/>
          <Route exact path="/cadastro4" component={Cadastro4}/>

          <Route exact path="/home" component={Home}/>
          <Route path="/vision" component={TensorFlowVision}/>
          <Route path="/voice"  component={TrainChat} />
          <Route path="/config"  component={Config} />
          <Route path="/robot"  component={Motors} />
        </Switch>
   </BrowserRouter>
  )
}

export default Router;
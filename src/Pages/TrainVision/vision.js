import React ,{Component} from 'react';


import { 
   InteracaoStyles,
   Button, 
   ContainerButton,
   DivCam,
   Camera,
   ContainerColection,
   ContainerForm
    } from './styles';

import {FaPlus, FaMinus, FaCameraRetro } from 'react-icons/fa'

import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:3001')



class App extends Component{ 
  
  constructor(props){
    super(props)
    this.state = {
     label:'',
     camState:false,
     image64:null,
     positive_colections:[],
    }
  }
  
comunicate = ()=>{
  io.on('data',(data)=>{ 
     this.setState({
       image64:data
     })           
  })
  
  
}

startcam = ()=>{
    if(this.state.camState===true){
      io.emit('startVision', {
        startVisionCamera:false
       })
       this.setState({
          camState:false
       })
    }else if(this.state.camState===false){
     io.emit('startVision', {
      startVisionCamera:true
     })
      this.setState({
        camState:true
      })
    }
  } 

submitToTrain = ()=>{
    io.emit('submit_to_train', {
      label:this.state.label,
      positive_amostrage:this.state.positive_colections,
       })  
    this.setState({
      label:'',
      camState:false,
      image64:null,
      positive_colections:[],
    })
  }

take_positive_pictures_plus = ()=>{
  if(this.state.camState===true){
  let novaLista = this.state.positive_colections
  novaLista.push(this.state.image64)
  this.setState({
    positive_colections:novaLista
  })
 }
}
take_positive_pictures_minus = ()=>{
  if(this.state.camState===true){
  let novaLista = this.state.positive_colections
  novaLista.splice(this.state.positive_colections.length - 1, 1)
  this.setState({
    positive_colections:novaLista
  })
 }
}
componentDidMount(){
  this.comunicate()
  
}


render(){
return (
   <>
    
    <InteracaoStyles >
      <DivCam>        
         {this.state.camState===true && <Camera  src={`data:image/jpeg;base64,${this.state.image64}`}></Camera>}  
         <ContainerButton>
          <Button onClick={this.startcam}>     
              <FaCameraRetro color='#44c2d4' size={100}/>         
          </Button>          
         </ContainerButton>             
      </DivCam>
     <div>
     <h3> 
        digite o nome do objeto que deseja treinar       
      </h3>
     <ContainerForm>
      <input 
         placeholder="qual o nome do objeto ?"
         value={this.state.label}
         onChange={(event)=>{this.setState({label:event.target.value})}}></input>    
         <button  onClick={this.submitToTrain}>Enviar para treinamento</button>
       </ContainerForm>      
      <h1> 
        coleção de amostras positivas para treinamento       
      </h1>
      <div>
      <Button onClick={this.take_positive_pictures_plus}>     
          <FaPlus color='#44c2d4' size={25}/>         
        </Button> 
        <Button onClick={this.take_positive_pictures_minus}>     
          <FaMinus color='#44c2d4' size={25}/>         
        </Button> 
      </div>
      <ContainerColection>
      {this.state.positive_colections.map((item,index)=>{
        return<Camera
           key={index} 
           src={`data:image/jpeg;base64,${item}`}/>
        })
      }
      </ContainerColection>
      {
        !this.state.positive_colections.length && <h3>sem foto na coleção</h3>
      }
     </div>    
    </InteracaoStyles>
   </>
   )
  }
}

export default App;

import React,{useEffect,useState} from 'react';
import './style.css'
import api from '../../Services/axios'



function TrainVoice () {
    const [intents, setIntents]=useState([])

    
useEffect(()=>{
     const result = async()=>{
     const response= await api.get('/list-intents')
     console.log(response)     
     setIntents(response.data.intents)
     }
     result()     
},[])
  
      return(        
        <div>
          <div className="class-intents">
            <h3>
              intenções   
            </h3> 
            <ul>{intents.map((intent,index)=>{
                 return (<div className=" item" key={index}>{intent.intent}</div>)
               })}
               </ul>                   
          </div>
          <div className="class-dialogs">
            dialog
          </div>
        </div>
      )
  
}


export default TrainVoice;
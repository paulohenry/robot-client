import React,{useState} from 'react';
import './style.css'

import {
  FaArrowAltCircleLeft,
  FaRegComments,
  FaTheaterMasks,
  FaRobot,
  FaHome,
  FaYoutube
} from 'react-icons/fa'


import Aprenda from '../../Components/aprenda/index'
import Contexto from '../../Components/contexto/index'
import Entidade from '../../Components/entidades/index'
import Resposta from '../../Components/respostas/index'
import Video from '../../Components/video/index'

import {Link} from 'react-router-dom'

function TrainChat () {    
    
    const [select, setSelect]=useState('home')
   
  
  return(    
        <div className="layout">            
              <Link className="voltar" to="/">
               <FaArrowAltCircleLeft size={25}/>
              </Link>            
            <aside>
              <div 
                className="home" 
                onClick={()=>{setSelect('home')}}>
                  <FaHome size={25}/>
                  <p>Aprenda</p>
              </div>
              <div 
                className="intencoes" 
                onClick={()=>{setSelect('contexto')}}>
                  <FaRegComments size={25}/>
                  <p>Contexto</p>
              </div>
              <div 
                className="entidades" 
                onClick={()=>{setSelect('entidade')}}>
                  <FaTheaterMasks size={25}/>
                  <p>Entidades</p>
              </div>
              <div 
                className="respostas" 
                onClick={()=>{setSelect('respostas')}}>
                  <FaRobot size={25}/>
                  <p>Respostas</p>
              </div>
              <div 
                className="video" 
                onClick={()=>{setSelect('video')}}>
                  <FaYoutube size={25}/>
                  <p>Video Aula</p>
              </div>
            </aside>  
            <main>
              <div className="content-screens">
                  { select === 'home' && <div className="telas" ><Aprenda/></div>
                  }
                  { select === 'contexto' && <div className="telas"><Contexto/></div>
                  }
                  { select === 'entidade' && <div className="telas"><Entidade/></div>
                  }
                  { select === 'respostas'&& <div className="telas"><Resposta/></div>
                  }
                  { select === 'video'&& <div className="telas"><Video/></div>
                  }
              </div>
                
            </main>
                    
        </div>
      )
  
}


export default TrainChat;
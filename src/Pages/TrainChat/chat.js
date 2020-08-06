import React,{useState} from 'react';
import './style.css'

import {
  FaArrowAltCircleLeft,
  FaRegComments,
  FaQuestion,
  FaRobot,
  FaHome,
  FaYoutube
} from 'react-icons/fa'


import Aprenda from '../../Components/chat-components/aprenda/aprender'
import Contexto from '../../Components/chat-components/contexto/contexto'
import Entidade from '../../Components/chat-components/entidades/entidades'
import Resposta from '../../Components/chat-components/respostas/respostas'
import Video from '../../Components/chat-components/video/video'

import {Link} from 'react-router-dom'

function TrainChat () {    
    
    const [select, setSelect]=useState('video')
   
  
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
                  <p>Desempenho</p>
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
                  <FaQuestion size={25}/>
                  <p>Questões</p>
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
                  <p>Aprenda</p>
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
                  { select === 'video'&& <div className="telas-video"><Video/></div>
                  }
              </div>
                
            </main>
                    
        </div>
      )
  
}


export default TrainChat;
import React,{useState} from 'react';

import './style.css'
import { Link } from 'react-router-dom'
import {
  FaArrowAltCircleLeft,
  FaEye,
  FaQuestion,
  FaRobot,
  FaHome,
  FaYoutube
} from 'react-icons/fa'
import Playground from '../../Components/vision-components/playground/index'
import Entidade from '../../Components/chat-components/entidades/entidades'
import Aprender from '../../Components/vision-components/aprenda/aprender'
import Videos from '../../Components/vision-components/video/video'
const Tensor_Vision=(props)=> {
  
  const [select, setSelect]=useState('video')

  return(
       <div className="container-all">
          <aside className="menu-vision">
            <Link className="voltar-vision" to="/home">
               <FaArrowAltCircleLeft size={25}/>
            </Link> 
            <div 
                className="home-vision" 
                onClick={()=>{setSelect('home')}}>
                  <FaHome size={25}/>
                  <p>Desempenho</p>
              </div>
              <div 
                className="intencoes-vision" 
                onClick={()=>{setSelect('vision')}}>
                  <FaEye size={25}/>
                  <p>Treinar visão</p>
              </div>
              <div 
                className="entidades-vision" 
                onClick={()=>{setSelect('questoes')}}>
                  <FaQuestion size={25}/>
                  <p>Questões</p>
              </div>
              <div 
                className="respostas-vision" 
                onClick={()=>{setSelect('algoritms')}}>
                  <FaRobot size={25}/>
                  <p>Crie Algoritmos</p>
              </div>
              <div 
                className="video-vision" 
                onClick={()=>{setSelect('video')}}>
                  <FaYoutube size={25}/>
                  <p>Aprenda</p>
              </div>
          </aside >        
          <div className="container">
                  { select === 'home' && <Aprender className="aprender"/>
                  }
                  { select === 'vision' && <Playground className="maintenance"/>
                  }
                  { select === 'questoes' && <Entidade className="maintenance"/>
                  }
                  { select === 'algoritms'&& <Entidade className="maintenance"/>
                  }
                  { select === 'video'&& <Videos className="videos"/>
                  }
          </div>
   </div>
  )
}

export default Tensor_Vision;
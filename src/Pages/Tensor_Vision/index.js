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

const Tensor_Vision=(props)=> {
  
  const [select, setSelect]=useState('video')

  return(
       <div className="container-all">
          <aside className="menu-vision">
            <Link className="voltar-vision" to="/">
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
                onClick={()=>{setSelect('contexto')}}>
                  <FaEye size={25}/>
                  <p>Treinar visão</p>
              </div>
              <div 
                className="entidades-vision" 
                onClick={()=>{setSelect('entidade')}}>
                  <FaQuestion size={25}/>
                  <p>Questões</p>
              </div>
              <div 
                className="respostas-vision" 
                onClick={()=>{setSelect('respostas')}}>
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
                  { select === 'home' && <Playground/>
                  }
                  { select === 'contexto' && <Playground/>
                  }
                  { select === 'entidade' && <Playground/>
                  }
                  { select === 'respostas'&& <Playground/>
                  }
                  { select === 'video'&& <Playground/>
                  }
          </div>
   </div>
  )
}

export default Tensor_Vision;
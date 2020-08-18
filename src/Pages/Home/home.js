import React,{useEffect} from 'react';
import './style.css'
import axios from '../../Services/axios'
import {
  FaEye,
  FaRegComments,
  FaCogs,
  FaRobot
} from 'react-icons/fa'

import {Link} from 'react-router-dom'

function Home() { 
  const ckeckTag = ()=>{
    try{
        
    }catch(error){

    }
  }
   useEffect(()=>{
    ckeckTag()
   },[])
  return (
      <div className="conteudo">
        <Link className="content-vision" to="/vision"><FaEye size={100}></FaEye ><p className="text">visão computacional</p></Link>
        <Link className="content-voice" to="/voice"><FaRegComments size={100}/><p className="text">processamento de linguagem natural</p></Link>
        <Link className="content-config" to="/config"><FaCogs size={100}></FaCogs><p className="text">Configurações</p></Link>
        <Link className="content-robot" to="/robot"><FaRobot size={100}></FaRobot><p className="text">Funções motoras</p></Link>
      </div>
  )
}

export default Home;
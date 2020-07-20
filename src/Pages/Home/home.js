import React from 'react';
import './style.css'

import {
  FaEye,
  FaRegComments,
  FaCogs,
  FaRobot
} from 'react-icons/fa'

import {Link} from 'react-router-dom'

function Home() { 

  return (
      <div className="conteudo">
        <Link className="content-vision" to="/vision"><FaEye size={100}></FaEye ><p className="text">visão computacional</p></Link>
        <Link className="content-voice" to="/voice"><FaRegComments size={100}/><p className="text">conversação</p></Link>
        <Link className="content-config" to="/config"><FaCogs size={100}></FaCogs><p className="text">Configurações</p></Link>
        <Link className="content-robot" to="/robot"><FaRobot size={100}></FaRobot><p className="text">Funções motoras</p></Link>
      </div>
  )
}

export default Home;
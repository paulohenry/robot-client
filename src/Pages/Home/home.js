import React,{useEffect,useState} from 'react';
import './style.css'
import avatar from '../../Assets/avatar.jpg'
import {
  FaEye,
  FaRegComments,
  FaCogs,
  FaRobot
} from 'react-icons/fa'

import {useHistory,Link} from 'react-router-dom'




function Home() {  
  const history=useHistory()
  const [datas,setDatas]=useState({})
  const loadDatas = () =>{
    const datasLoad = JSON.parse(localStorage.getItem('userDatas'))
    setDatas(datasLoad)
  }
  const exitAll = ()=>{
      localStorage.clear()
      history.push('/')
  }
   useEffect(()=>{
      loadDatas()
   },[])

  return (
    <div className="container-home">
      <section className="header-home">
          <img src={datas.image_aluno?`data:image/png;base64,${datas.image_aluno}`:avatar}/>
          <p>Treinador: {datas.nome_aluno}</p>
          <img src={datas.image_robot?`data:image/png;base64,${datas.image_robot}`:avatar}/>
          <p>Avatar: {datas.nome_robot}</p>
          <p className="header-home-sair" onClick={()=>exitAll()}>Sair</p>        
      </section>
      <div className="conteudo">
        <Link className="content-vision" to="/vision"><FaEye size={70}></FaEye ><p className="text">visão computacional</p></Link>
        <Link className="content-voice" to="/voice"><FaRegComments size={70}/><p className="text">processamento de linguagem natural</p></Link>
        <Link className="content-config" to="/config"><FaCogs size={70}></FaCogs><p className="text">Configurações</p></Link>
        <Link className="content-robot" to="/robot"><FaRobot size={70}></FaRobot><p className="text">Funções motoras</p></Link>
      </div>
    </div>
      
  )
}

export default Home;
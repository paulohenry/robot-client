import React,{useEffect,useState} from 'react'
import './style.css'
import {FaUserPlus, FaUsers} from 'react-icons/fa'
import {Link, useHistory} from 'react-router-dom'
import Loading from '../../Components/loading/loading'
import {FaArrowLeft} from 'react-icons/fa'

export default function Login() {
  
  const history = useHistory()
  const [loading,setLoading]=useState(true)

  const backToOrigin = ()=>{
    history.push('/');
  }
  useEffect(()=>{
    setLoading(false)
  },[])
  return (
    <>
    {!loading?<div className="component-login-container">
        <button className="button-back-to-origin" onClick={()=>backToOrigin()}>
           <FaArrowLeft size={70} style={{color:'#0F62FE;',zIndex:5}}/>
        </button>
        <div className="component-login-cadastrar">
          <Link  to="/cadastro1" style={{textDecoration: 'inherit'}}>
        <button className="button-cadastrar">
          <FaUserPlus size={200}/>
          Quero ser aluno
        </button>
        </Link>
        </div>
        <div className="component-login-login">
        <Link to="/lista" style={{textDecoration: 'inherit'}}>
        <button className="button-login">
           <FaUsers size={200}/>
           Já sou aluno
        </button>
        </Link>
        </div>
    </div>:<Loading/>}</>
  )
}

import React,{useEffect,useState} from 'react';
import axios from 'axios'
import {FaArrowLeft} from 'react-icons/fa'
import Loading from '../../Components/loading/loading'
import {Container,Button} from './style'
import BlocoLogin from '../../Components/BlocoLogin/index'
import {Link}from 'react-router-dom'

function Lista() {

const [datas,setDatas]=useState([])
const [loading,setLoading]=useState(true)
const getDatas = async()=>{
  const i = localStorage.getItem('ipconfig')
  const ip = JSON.parse(i)
  try{
  const response = await axios.get(`${ip}/all-users`)
  console.log(response.data.data)
  setLoading(false)
  setDatas(response.data.data)
  }catch(error){
    setLoading(false)
  }
}
const getSelectDatas = (user)=>{
    localStorage.setItem('userDatas', JSON.stringify(user))
}
useEffect(()=>{
    getDatas()
},[])
  return (
    <>
    {!loading?
      <Container>
        <Link to="/login" style={{ border:'none',textDecoration: 'none' }}>
          <Button>
           <FaArrowLeft size={70} style={{color:'#0F62FE;',zIndex:5}}/>
          </Button>           
        </Link>
        <h1 style={{color:'#0F62FE',marginBottom:'5vh'}}>Escolha uma conta para entrar</h1>
         {!loading && datas.length>0?datas.map((user,index)=>{
          return(            
              <>
             <Link to="/home" style={{ border:'none',textDecoration: 'none' }}>               
                <BlocoLogin
                  imgAluno={user.image_aluno}
                  imgRobot={user.image_robot}
                  nomeAluno={user.nome_aluno}
                  nomeRobot={user.nome_robot}
                  catchAndLog={()=>{getSelectDatas(user)}}/>                
              </Link>
              </>
              )
           }):<h1>Nenhum usuário cadastrado</h1>
          }                
      </Container>:<Loading/>}
    </>
  )
}

export default Lista;
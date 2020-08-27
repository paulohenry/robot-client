import React,{useState,useEffect} from 'react';
import { Container,Image,Titulo,Input,Button} from'./style'
import magicstar from '../../Assets/magic.png'
import {Link} from 'react-router-dom'
function IpPage() {

  const[input,setInput]=useState('')

  const onChangeValue = (e)=>{
      setInput(e.target.value)
  }
  const entrar = ()=>{
    localStorage.setItem('ipconfig',JSON.stringify(input))
  }

  useEffect(()=>{
    
    localStorage.setItem('register',JSON.stringify({}))
    localStorage.setItem('userDatas',JSON.stringify([]))
    const ip = JSON.parse(localStorage.getItem('ipconfig'))
    if(ip){
      setInput(ip)
    }else{
      setInput('')
    }
    
  },[])
  return (
    <Container>
      <Image src={magicstar}/>
      <Titulo >Digite o IP disponível no seu robô</Titulo>
      <Input  placeholder="Exemplo http:// ip-do-robo : porta-do-robo"
              value={input} 
              onChange={(e)=>onChangeValue(e)}/>
      <Link to="/login">
      <Button onClick={()=>{entrar()}}>Entrar</Button>
      </Link>
    </Container>
    );
}

export default IpPage;
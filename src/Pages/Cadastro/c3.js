import React,{useEffect,useState,useRef} from 'react';
import {Container, Form,Input,Button, TypicalStylized,MagicImage,ImageContainer,AvatarImage,Voltar} from './style'
import {synth,utterance} from '../../Services/textToSpeech'
import {useHistory} from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
import avatar1 from '../../Assets/encoded/avatar1.json'
import avatar2 from '../../Assets/encoded/avatar2.json'
import avatar3 from '../../Assets/encoded/avatar3.json'
import avatar4 from '../../Assets/encoded/avatar4.json'
import avatar5 from '../../Assets/encoded/avatar5.json'
import avatar6 from '../../Assets/encoded/avatar6.json'

import magic from '../../Assets/magic.png'

const falas = `Escolha seu robô e dê um nome ao seu novo amigo`




function Cadastro3() {

const history = useHistory()

const ref1 = useRef()

const [nome_robot, set_nome_robot]=useState('')
const [showInput,setShowInput]=useState(false)
const [avatares,setAvatares]=useState([
  {
    avatar:avatar1,
    selected:false
  },
  {
    avatar:avatar2,
    selected:false
  },
  {
    avatar:avatar3,
    selected:false
  },
  {
    avatar:avatar4,
    selected:false
  },
  {
    avatar:avatar5,
    selected:false
  },
  {
    avatar:avatar6,
    selected:false
  },])
  

const chamaVoz = async ()=>{    
    setTimeout(()=>{
        utterance.text=falas
        synth.speak(utterance)      
    },100)    
    setTimeout(()=>{      
      setShowInput(true)    
    },3000)    
  
}
const getInput = (e)=>{
  e.preventDefault()
  const register = JSON.parse(localStorage.getItem('register'))
  const avatar = []
  avatares.map(_ava=>_ava.selected===true && avatar.push(_ava.avatar))
  const register2 = {
    nome_aluno:register.nome_aluno,
    ra:register.ra,
    ibm_api_key:register.ibm_api_key,
    ibm_url:register.ibm_url,
    ibm_assistant_id:register.ibm_assistant_id,
    ibm_session_id:register.ibm_session_id,
    ibm_skill_id:register.ibm_skill_id,
    nome_robot:nome_robot,
    image_robot:avatar[0]
  }
  localStorage.setItem('register', JSON.stringify(register2))
  history.push('/cadastro4')
}
const changeInput = (e)=>{
  e.preventDefault()  
  set_nome_robot(ref1.current.value)
}
const selectedImageFunc = (e,index)=>{
    const selected = []
   avatares.map((_ava,_index)=>{
     if(index===_index){
      return(
        selected.push({
          avatar:_ava.avatar,
          selected:true})
      )
     }else{
       return(
        selected.push({
          avatar:_ava.avatar,
          selected:false})
       )
     }  
   })
   setAvatares(selected)
}


useEffect(()=>{
      chamaVoz()
      return ()=>synth.cancel()
},[])

  return (
    <Container>  
      <Voltar onClick={()=>history.push('/cadastro2')}>
      <FaArrowLeft size={70} style={{color:'#0F62FE;',zIndex:5}}/>
      </Voltar>
      <MagicImage src={magic}/>    
       <TypicalStylized
        steps={
          [`Escolha seu robô e dê um nome ao seu novo amigo`]}
           loop={1}
        />
        {showInput && <ImageContainer>
        {avatares.map((ava,index,array)=>{
          return(
            <AvatarImage 
                key={index}               
                onClick={(e)=>selectedImageFunc(e,index,array)} 
                avatarSelected={ava.selected}
                src={`data:image/jpeg;base64,${ava.avatar}`}/>
          )
        })}
                       
      </ImageContainer>}
       {showInput &&
          <Form onSubmit={(e)=>getInput(e)}>
              <Input ref={ref1} placeholder="Nome do seu novo amigo" value={nome_robot} onChange={(e)=>changeInput(e)}/>
              <Button type="submit">Próximo</Button>
          </Form>        
        }
    </Container>
  );
}

export default Cadastro3;

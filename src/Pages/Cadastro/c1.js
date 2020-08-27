import React,{useEffect,useState,useRef} from 'react';
import {Container, Form,Input,Button, TypicalStylized,MagicImage,Voltar} from './style'
import {synth,utterance} from '../../Services/textToSpeech'
import {useHistory} from 'react-router-dom'
import Dialog from '../../Components/dialog/dialog'
import axios from 'axios'
import magic from '../../Assets/magic.png'
import {FaArrowLeft} from 'react-icons/fa'
const falas = `Olá, seja bem vindo a plataforma magic star de aprendizado em inteligência artificial 
para começar precisamos cadastra-lo, digite o seu nome e seu R.A escolar`

function Cadastro1() {

const[openDialog, setOpenDialog]=useState(false)
const history = useHistory()
const input_nome_aluno = useRef()
const input_ra = useRef()
const [nome_aluno, set_nome_aluno]=useState('')
const [ra, set_ra]=useState('')
const [showInput,setShowInput]=useState(false)
const[logs_de_alert, setLogs]=useState({})

const chamaVoz = async ()=>{    
    setTimeout(()=>{
        utterance.text=falas
        synth.speak(utterance)      
    },100)    
    setTimeout(()=>{      
      setShowInput(true)    
    },14000)    
  
}
const getInput = async(e)=>{
  e.preventDefault()
  try{
    const register = {
      nome_aluno:nome_aluno,
      ra:ra
    }
    const ip = JSON.parse(localStorage.getItem('ipconfig'))
    const resposta = await axios.post(`${ip}/unique-user`,{ra:ra})
    console.log(resposta)
    if(resposta.data.data.length>0){
        handleAlert('Ação não permitida', 'Tentativa de registro inválida', 'esse usuário já existe'
        ,'tente outro RA escolar', 'caso não saiba seu RA pessa ajuda à professora')
    }else{
      localStorage.setItem('register', JSON.stringify(register))
      history.push('/cadastro2')
    }
  }catch(error){
    handleAlert('Ação mal sucedida', 'Erro ao recuperar os dados do backend',
    'verifique sua internet')
  }
}
const changeInputAluno = (e)=>{
  e.preventDefault()
 
  set_nome_aluno(input_nome_aluno.current.value)
}
const changeInputra = (e)=>{
  e.preventDefault()
  
  set_ra(input_ra.current.value)
}
const handleAlert=(
  title='seu titulo',body='seu corpo',message1='',message2='',message3='')=>{
   setLogs({
      title:title,
      body:body,
      message1:message1,
      message2:message2,
      message3:message3,
      }) 
    setOpenDialog(true)    
 
}
useEffect(()=>{
      chamaVoz()
      return ()=>synth.cancel()
},[])

  return (
    <Container>
      <Voltar onClick={()=>history.push('/login')}>
      <FaArrowLeft size={70} style={{color:'#0F62FE;',zIndex:5}}/>
      </Voltar>
      <MagicImage src={magic}/>
       <TypicalStylized
        steps={
          [`Olá, seja bem vindo a plataforma magic star de aprendizado em inteligência artificial 
          para começar precisamos cadastra-lo, digite o seu nome e seu R.A escolar`]}
           loop={1}
        />
       {showInput &&
          <Form onSubmit={(e)=>getInput(e)}>
              <Input ref={input_nome_aluno} placeholder="nome do aluno" value={nome_aluno} onChange={(e)=>changeInputAluno(e)}/>
              <Input ref={input_ra} placeholder="Seu RA escolar (apenas os números)"value={ra} onChange={(e)=>changeInputra(e)}/>
              <Button type="submit">Próximo</Button>
          </Form>        
        }<Dialog 
        open={openDialog} 
        onClose={()=>{setOpenDialog(false)}}
        clickButton={()=>{setOpenDialog(false)}}
        title={logs_de_alert.title}   
        body={logs_de_alert.body}    
        message1={logs_de_alert.message1} 
        message2={logs_de_alert.message2} 
        message3={logs_de_alert.message3}                  
        />
    </Container>
  );
}

export default Cadastro1;
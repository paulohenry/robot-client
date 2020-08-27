import React,{useEffect,useState,useRef} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {FaArrowLeft} from 'react-icons/fa'
import {Container, Form,Input,Button, TypicalStylized,MagicImage,Voltar} from './style'
import {synth,utterance} from '../../Services/textToSpeech'
import magic from '../../Assets/magic.png'
import watsonConfig from '../../Config/watson-config'
import Dialog from '../../Components/dialog/dialog'

const falas = `Digite a credencial que você recebeu no cartão`


function Cadastro2() {

const[openDialog, setOpenDialog]=useState(false)
const history = useHistory()
const ref1 = useRef()
const [identifier, set_identifier]=useState('')
const [showInput,setShowInput]=useState(false)
const[logs_de_alert, setLogs]=useState({})


const chamaVoz = async ()=>{    
    setTimeout(()=>{
        utterance.text=falas
        synth.speak(utterance)      
    },100)    
    setTimeout(()=>{      
      setShowInput(true)    
    },3000)    
  
}
const getInput = async(e)=>{
  e.preventDefault()

  try{
  const ip = JSON.parse(localStorage.getItem('ipconfig'))
  const response = await axios.post(`${ip}/admin/consult`,{identifier:identifier})
  if(response.status===200){
    handleAlert('Resultado', response.data.message)
  }else if(response.status===201 && response.data.data.length>0){
    console.log(response)
    const register = JSON.parse(localStorage.getItem('register'))
    const register2 = {
      nome_aluno:register.nome_aluno,
      ra:register.ra,
      ibm_api_key:watsonConfig.ibm_api_key,
      ibm_url:watsonConfig.ibm_url,
      ibm_session_id:watsonConfig.constructSession(response.data.data[0].ibm_assistant_id),
      ibm_assistant_id:response.data.data[0].ibm_assistant_id,
      ibm_skill_id:response.data.data[0].ibm_skill_id
    }
    localStorage.setItem('register', JSON.stringify(register2))
    
    history.push('/cadastro3')
    }
  }catch(error){
    handleAlert('Ação mal sucedida','Erro interno')
  }
}
const changeInput1 = (e)=>{
  e.preventDefault()  
  set_identifier(ref1.current.value)
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
      <Voltar onClick={()=>history.push('/cadastro1')}>
      <FaArrowLeft size={70} style={{color:'#0F62FE;',zIndex:5}}/>
      </Voltar>
      <MagicImage src={magic}/>
       <TypicalStylized
        steps={
          [`Digite a credencial que você recebeu no cartão`]}
           loop={1}
        />
       {showInput &&
          <Form onSubmit={(e)=>getInput(e)}>
              <Input ref={ref1} placeholder="Exemplo: aluno0342 " value={identifier} onChange={(e)=>changeInput1(e)}/>
              
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

export default Cadastro2;

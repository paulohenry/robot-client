import React,{useState,useRef} from 'react'
import './style.css'

import {FaArrowAltCircleLeft} from 'react-icons/fa'
import Dialog  from '../../Components/dialog/dialog'
import axios from '../../Services/axios'

const ConfigPage = ()=>{


  const [ipValue,setIpValue]=useState('')
  const [tagValue,setTagValue]=useState('')
  const[openDialog, setOpenDialog]=useState(false)
  const inputref=useRef()
  const inputref2=useRef()
  const[logs_de_alert, setLogs]=useState({})

  const salvarIp = async(e)=>{
      e.preventDefault()
      try{
      console.log(inputref.current.value)
      const data = inputref.current.value
      localStorage.setItem('ipconfig', data)
      console.log(localStorage.getItem('ipconfig'))     
handleAlert('Ação bem sucedida', 'dados salvos com sucesso' )
}catch(error){
  handleAlert('Ação mal sucedida', 
  'erro ao tentar salvar',
  'verifique sua internet',
  'verifique o ip do seu robô'
  )
}
}

  const salvarTag = async(e)=>{
    e.preventDefault()
    try{
    console.log(inputref2.current.value)
    const data2 = inputref2.current.value
    localStorage.setItem('image_tag', data2)
    console.log(localStorage.getItem('image_tag'))
    
    const res = await axios.post('/image_tag', {image_tag:data2})
    console.log(res)
    handleAlert('Ação bem sucedida', 'dados salvos com sucesso', 'você já pode iniciar seus estudos', )
    }catch(error){
      handleAlert('Ação mal sucedida', 
      'erro ao tentar salvar',
      'verifique sua internet',
      'verifique o ip do seu robô'
      )
    }
}
  
  const changeInput=(e)=>{
      console.log(e.currentTarget.value)
      setIpValue(e.currentTarget.value)
  }
  const changeInput2=(e)=>{
    console.log(e.currentTarget.value)
    setTagValue(e.currentTarget.value)
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

  return(
    <div className="containerConfig">
      <a href="/">
        <button className="conf-buttonVoltar">
          <FaArrowAltCircleLeft size={62}/>
        </button>
      </a>
      <h1>Insira os dados de configuração antes de começar</h1>
      <form className="formConfig" onSubmit={(e)=>{salvarIp(e)}}>
        <input className="inputConfig" ref={inputref} 
          placeholder={localStorage.getItem('ipconfig')===null? "digite o ip do seu robo": localStorage.getItem('ipconfig')} 
          value={ipValue} 
          onChange={(e)=>changeInput(e)}/>
           <button className="buttonConfig" type="submit">Salvar IP</button>
      </form>
      <form className="formConfig" onSubmit={(e)=>{salvarTag(e)}}>
      <input  className="inputConfig" ref={inputref2} 
           placeholder={localStorage.getItem('image_tag')===null? "digite tag de ativação da camera": localStorage.getItem('image_tag') } 
        value={tagValue} onChange={(e)=>changeInput2(e)}/>
       <button className="buttonConfig" type="submit">Salvar tag</button>
      </form>     
      
      <Dialog
        open={openDialog} 
        onClose={()=>{setOpenDialog(false)}}
        clickButton={()=>{setOpenDialog(false)}}
        title={logs_de_alert.title}   
        body={logs_de_alert.body}    
        message1={logs_de_alert.message1} 
        message2={logs_de_alert.message2} 
        message3={logs_de_alert.message3}   
        />
    </div>
  )
}

export default ConfigPage
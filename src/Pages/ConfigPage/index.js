import React,{useState,useRef,useEffect} from 'react'
import './style.css'
import {useHistory} from 'react-router-dom'
import {FaArrowAltCircleLeft} from 'react-icons/fa'
import Dialog  from '../../Components/dialog/dialog'
import axios from 'axios'

const ConfigPage = ()=>{

  const history = useHistory()
  const [ipValue,setIpValue]=useState('')
  const [tagValue,setTagValue]=useState('')
  const[openDialog, setOpenDialog]=useState(false)
  const inputref=useRef()
  const inputref2=useRef()
  const[logs_de_alert, setLogs]=useState({})

  useEffect(()=>{
    const {tag_camera} = JSON.parse(localStorage.getItem('userDatas'))
    setTagValue(tag_camera)
      const ip = JSON.parse(localStorage.getItem('ipconfig'))
      setIpValue(ip)
  },[])

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
    const data2 = inputref2.current.value 
    const register = JSON.parse(localStorage.getItem('userDatas'))
      
    const res = await axios.put(`${ipValue}/imagesTags`, {
      tag_camera:data2,
      ra:register.ra
    })
     console.log(res)
    const register2 = {
      nome_aluno:register.nome_aluno,
      ra:register.ra,
      ibm_api_key:register.ibm_api_key,
      ibm_url:register.ibm_url,
      ibm_assistant_id:register.ibm_assistant_id,
      ibm_session_id:register.ibm_session_id,
      ibm_skill_id:register.ibm_skill_id,
      nome_robot:register.nome_robot,
      image_robot:register.image_robot,
      image_aluno:register.image_aluno,
      tag_camera:res.data.data,
      tags_motors:register.tags_motors,
      toggle_name_robot:register.toggle_name_robot,      
    } 
    localStorage.setItem('userDatas', JSON.stringify(register2))
    console.log(res)
    handleAlert('Ação bem sucedida', 'dados salvos com sucesso', 'você já pode iniciar seus estudos', )
    }catch(error){
      console.log(error)
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
    
        <button className="conf-buttonVoltar" onClick={()=> history.push('/home')}>
          <FaArrowAltCircleLeft size={62}/>
        </button >
     
      <h1 className="h1-title">Aqui você pode alterar algumas configurações</h1>
      <form className="formConfig" onSubmit={(e)=>{salvarIp(e)}}>
        <input className="inputConfig" ref={inputref} 
          placeholder={localStorage.getItem('ipconfig')===null? "digite o ip do seu robo": localStorage.getItem('ipconfig')} 
          value={ipValue} 
          onChange={(e)=>changeInput(e)}/>
           <button className="buttonConfig" type="submit">Salvar Novo IP</button>
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
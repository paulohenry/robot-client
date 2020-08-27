import React,{useEffect,useState,useRef} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Webcam from 'react-webcam'
import {FaArrowLeft} from 'react-icons/fa'
import {
  Container,
  Button, 
  TypicalStylized,
  MagicImage,
  ContainerButtons4,
  IconPhoto,
  IconX,
  PictureContainer,
  Pic,
  WebcamComponent,
  ContainerSelf,
  LoadingComponent,
  Voltar
} from './style'
import {synth,utterance} from '../../Services/textToSpeech'
import Dialog from '../../Components/dialog/dialog'
import magic from '../../Assets/magic.png'

const falas = `Falta pouco, vamos agora tirar uma selfie`

const constrains={
  height:200,
  width:200,
  facingMode:"user"  
}


function Cadastro4() {

const camRef2=useRef() 
const [picture,setPicture]=useState(null)
const [openDialog, setOpenDialog]=useState(false)
const history = useHistory()
const [logs_de_alert, setLogs]=useState({})
const [show, setShow] = useState(false)
const [showWebcam, setShowWebcam] = useState(false)
const [loading,setLoading]=useState(false)

const chamaVoz = async ()=>{    
    setTimeout(()=>{
        utterance.text=falas
        synth.speak(utterance)      
    },100)    
    setTimeout(()=>{      
      setShow(true)    
    },2500)    
  
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
const getPicture = ()=>{
    if(showWebcam){
      const screenShot = camRef2.current.getScreenshot({width: 200, height: 200})
      const img64 = convertTo64(screenShot)
      setPicture(img64)
    }else{
      setShowWebcam(true)
    }
}
const removerPicture = (num)=>{
  if(num===1){
    setPicture(null)
  }else{
    setPicture(null)
    setShowWebcam(false)
  }
}
const finishCadastro = async()=>{
  const ip = JSON.parse(localStorage.getItem('ipconfig'))
  const register = JSON.parse(localStorage.getItem('register'))
    if(picture){
      try{
        
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
          image_aluno:picture,
          tag_camera:null,
          tags_motors:null,
          toggle_name_robot:true,
          knn_model:null,
          dataset_model:null        
        }          
          setLoading(true)
          const response = await axios.post(`${ip}/users`, {data:register2})
          localStorage.setItem('userDatas', JSON.stringify(response.data.data))
          localStorage.setItem('register', JSON.stringify({}))
          setLoading(false)
          history.push('/home')
          console.log(response.data)
      }catch(error){
          handleAlert('Ação Mal sucedida','erro ao concluir o cadastro',
          'verifique sua internet ou conexão com o robo, verifique o IP inserido',
          'erro interno 500')
      }
    }else{
      try{
        
        const register3={
          nome_aluno:register.nome_aluno,
          ra:register.ra,
          ibm_api_key:register.ibm_api_key,
          ibm_url:register.ibm_url,
          ibm_assistant_id:register.ibm_assistant_id,
          ibm_session_id:register.ibm_session_id,
          ibm_skill_id:register.ibm_skill_id,
          nome_robot:register.nome_robot,
          image_robot:register.image_robot,
          image_aluno:null,
          tag_camera:null,
          tags_motors:null,
          toggle_name_robot:true,
          knn_model:null,
          dataset_model:null
        }
          setLoading(true)
          const response = await axios.post(`${ip}/users`, {data:register3})
          console.log(response.data)
          localStorage.setItem('userDatas', JSON.stringify(response.data.data))
          localStorage.setItem('register', JSON.stringify({}))
          setLoading(false)
          history.push('/home')
      }catch(error){
        handleAlert('Ação Mal sucedida','erro ao concluir o cadastro',
        'verifique sua internet ou conexão com o robo, verifique o IP inserido',
        'erro interno 500')
      }
    }
}
const convertTo64 = (image)=>{
  if(image.includes('data:image/jpeg;base64,')){
    const index_virgula = image.indexOf('9')
    const slice_resolve= image.slice(index_virgula)
    const bar_resolve = '/'.concat(slice_resolve)
    return bar_resolve
  }
}
useEffect(()=>{
      chamaVoz()
      return ()=>synth.cancel()
},[])

  return (
    <Container>
       <Voltar onClick={()=>history.push('/cadastro3')}>
      <FaArrowLeft size={70} style={{color:'#0F62FE;',zIndex:5}}/>
      </Voltar>
     {loading?<LoadingComponent/>:<>
      <MagicImage src={magic}/>
       <TypicalStylized
        steps={
          [`Falta pouco, vamos agora tirar uma selfie`]}
           loop={1}
        />
       {showWebcam && 
       <ContainerSelf>
         <IconX onClick={()=>{removerPicture(0)}}/>
         <WebcamComponent 
                screenshotFormat ="image/jpeg"
                ref={camRef2}
                mirrored="true" 
                videoConstraints={constrains}/>
          <PictureContainer>
          <IconX onClick={()=>{removerPicture(1)}}/>
            {picture?<Pic src={`data:image/jpeg;base64,${picture}`}/>:<IconPhoto/>}
          </PictureContainer>
       </ContainerSelf>
       }
       {show &&<ContainerButtons4>    
              <Button onClick={()=>{getPicture()}}>{showWebcam?'Tirar foto':'Quero uma selfie'}</Button>          
              <Button onClick={()=>{finishCadastro()}}>{picture?'Finalizar':'Não quero uma selfie'}</Button>
              </ContainerButtons4>                
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
        </>}
    </Container>
  );
}

export default Cadastro4;
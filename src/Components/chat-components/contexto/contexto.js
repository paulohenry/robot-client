import React,{useEffect,useState,createRef} from 'react';
import './style.css'

import Checkbox from '@material-ui/core/Checkbox';
import api from '../../../Services/axios'

import { FaTrashAlt, FaRegPlusSquare} from 'react-icons/fa'
import Loading from '../../loading/loading'

import ModalComponent from '../mini-components/modal-intent/modal'
import {parseISO,format,} from 'date-fns';
import {stylesheet} from './stylesheet'

import Dialog from '../../dialog/dialog'

const Contexto = (props) =>{

  const[openDialog, setOpenDialog]=useState(false)
  const [loading, setLoading] = useState(true)
  const [contextos, setContextos]=useState([])
  const [classModal, setClassModal] = useState(true)
  const [modalIsOpen,setIsOpen] = useState(false);
  const [callError, setCallError] = useState(false);
  const containerModal = createRef();
  const [conteudoClickado, setConteudoClickado]=useState({})
  const [trash, setTrash]=useState(true);
  const [zerado, setZerado]=useState(false)
  const[logs_de_alert, setLogs]=useState({})

  const getIntents = async()=>{
   
    setLoading(true)
    try{
      
      const resposta = await api.get('list-intents')
      const newList = formatedList(resposta.data.result.intents)
      if(resposta.data.result.intents.length===0){
          setZerado(true)
          console.log('insira uma intenção para começar')
      }else{
      setZerado(false) }
      setContextos(newList)
      setLoading(false)
      setCallError(false)      
    }catch(err){
      console.log(err)
      setCallError(true)
    }
        
}

  useEffect(()=>{ 
    getIntents()
  },[])
  useEffect(()=>{
    let contador=0
      contextos.map((l)=>{
        if(l.check===true){
          contador++
        }
      })
     if(contador===1){
        setTrash(false)
     }else{
       setTrash(true)
     }
  },[contextos])
  const formatedList = (lista)=>{
    const newList = []
    lista.map((l)=>{
      newList.push({
        check:false,
        intent:l.intent,
        description:l.description,
        updated:convertData(l.updated),
        created:convertData(l.created),
        examples:l.examples
      })
    })
    return newList
  }
  const selectCheck = (e,conteudo,index,array)=>{
     const newList = []
     array.map((l,_index)=>{
       if(index === _index){
         if(conteudo.check){
          newList.push({
            check:false,
            intent:conteudo.intent,
            description:conteudo.description,
            updated:conteudo.updated,
            created:conteudo.created,
            examples:conteudo.examples
           })
         }else{
         newList.push({
          check:true,
          intent:conteudo.intent,
          description:conteudo.description,
          updated:conteudo.updated,
          created:conteudo.created,
          examples:conteudo.examples
         })
        }
       }else{
         newList.push({
          check:false,
          intent:l.intent,
          description:l.description,
          updated:l.updated,
          created:l.created,
          examples:l.examples
         })
       }
     })
     console.log(newList)
     setContextos(newList)
  }

  const convertData = (data)=>{
     const parse =  parseISO(data)
     const formattedDate= format(parse, "dd-MM-yyyy")
     return formattedDate     
  }

  const afterOpenModal = ()=>{
  }
  const closeModal = ()=>{
    setClassModal(false)
    setTimeout(()=>{
      setIsOpen(false)
      getIntents()
    },500)
    
  }

  const openModal = (conteudo)=>{ 
 
      setClassModal(true)
      setIsOpen(true)    
      setConteudoClickado(conteudo)     
    
  }

 const removerContext = async()=>{
    const itemPop=[]
    const newList=[]
    contextos.map((l,index,array)=>{
        if(l.check){
          itemPop.push({
          check:l.check,
          intent:l.intent,
          description:l.description,
          updated:l.updated,
          created:l.created,
          examples:l.examples
          })
        }else{
          newList.push({
            check:l.check,
            intent:l.intent,
            description:l.description,
            updated:l.updated,
            created:l.created,
            examples:l.examples
            })
        }
    }) 
    
    try{
      const response = await api.post('delete-intent',{
        intent:itemPop[0].intent
      })
      console.log(response)
      setContextos(newList)
      if(newList.length===0){
        setZerado(true)
      console.log('insira uma intenção para começar')
      }else{setZerado(false)}
      handleAlert('Messagem de sucesso', 'Intenção deletada com sucesso')
      
    }catch(err){
      console.log(err)
      handleAlert('Log de erro', 'erro ao tentar deletar a intencao',
      'verifique sua internet', 'verifique o processo de backend do robo',
      'em ultimo caso contate o suporte técnico')
    }
    
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
    return (
      <>
      {modalIsOpen?(
       <ModalComponent
            container={containerModal}
            style={stylesheet}
            className={classModal}
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            onData={conteudoClickado}
            >
       </ModalComponent>
      ):(<div className="conteudo-intents">
        <div className="header-intents">
          <div className="text">
              <p>Cadastro de contextos</p>
          </div>
          <button 
            className="trash" 
            disabled={trash}
            onClick={()=>{removerContext()}}>
              <div className="texto-trash">
               <p>Remover contexto</p>
             </div>
            <FaTrashAlt size={40}/>
            </button>
          <button 
            className="plus"
            onClick={(e)=>openModal(e)} >           
             <p>Adicionar contexto</p>
             <FaRegPlusSquare size={40}/>
          </button>         
        </div>
       <table>
       <thead className="head-table">  
        <tr className="tr-thead">   
            <th className="head-th-checkbox">
               <input
               onChange={() =>{}}
                 checked={false}
                 type="checkbox"
            /></th>
            <th className="head-th-intent">Contextos:</th>
            <th className="head-th-description">Descrição:</th>
            <th className="head-th-modified">Modificado em:</th>
            <th className="head-th-conflict">criado em:</th>
            <th className="head-th-example">exemplos:</th>          
            </tr>     
        </thead>
      <tbody className="tbody-table">
      {callError?(
        <div className="aviso">
          <button>Verifique sua internet ou backend e tente novamente</button>
        </div>
      ):
      !loading ?(contextos.map((conteudo,index,array)=>{
           
          return(
            <tr 
              className="tbody-tr-conteudo"
             key={index}>
                <td>
                <Checkbox
                    checked={conteudo.check}
                    onChange={(e)=>{selectCheck(e,conteudo,index,array)}}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </td>
                <td className="td-hover"onClick={() =>{openModal(conteudo)}}>{conteudo.intent}</td>
                <td>{conteudo.description}</td>
                <td>{conteudo.updated}</td>
                <td>{conteudo.created}</td>
                <td className="td-example">{conteudo.examples.length}</td>
            </tr>
          )
        })): 
        <div className="aviso" onClick={()=>{getIntents()}}>
          <Loading/>
        </div>
        }
      </tbody>  
       </table>
       
        
    </div>)}<Dialog 
                open={openDialog} 
                onClose={()=>{setOpenDialog(false)}}
                clickButton={()=>{setOpenDialog(false)}}
                title={logs_de_alert.title}   
                body={logs_de_alert.body}    
                message1={logs_de_alert.message1} 
                message2={logs_de_alert.message2} 
                message3={logs_de_alert.message3}                  
                />{zerado && <div className="aviso"><button>Sem contextos, insira um contexto para começar</button></div>}
    </>)
}

export default Contexto;
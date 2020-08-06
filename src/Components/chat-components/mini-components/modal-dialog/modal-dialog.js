import React,{useEffect,useState,useRef} from 'react';

import './style.css'
import {stylesheet} from './stylesheet'
import {FaLongArrowAltLeft,FaRegPlusSquare,FaTrashAlt} from 'react-icons/fa'
import Modal from 'react-modal'
import Dialog from '../../../dialog/dialog'
import api from '../../../../Services/axios'

Modal.setAppElement(document.getElementById('root'))

const ModalComponent = (props)=>{

  const select1 = useRef()
  const select2 = useRef()
  const select3 = useRef()
  const[title, setTitle]=useState('adicione um ID único (titulo)')
  const[lista, setLista]=useState([])
  const[modo,setModo]=useState('random')
  const[conditions, setConditions] =useState([])
  const[conditions2, setConditions2] =useState([])  
  const[openDialog, setOpenDialog]=useState(false)
  const[logs_de_alert, setLogs]=useState({})
  const[box, setBox]=useState(false)
 
  const[e_ou,set_e_ou]=useState({
    e:'&&',
    ou:'||'
  })

  const fecharmodal=()=>{        
      setOpenDialog(false) 
      props.onRequestClose()   
  }

  const getIntents2 = async()=>{
    try{
      const response= await api.get('list-intents')
      if(props.onData1.title){
        setConditions([{intent:props.onData1.conditions}])
        setTitle(props.onData1.title)
        const newValues = []
        console.log(props.onData1)
        if(props.onData1.output.text){
          props.onData1.output.text.values.map(v=>{
            newValues.push({
              text:v
            })
          })
          setLista(newValues)
        }else{
          setLista(props.onData1.output.generic[0].values)
        }
        
      }else{
        setConditions(response.data.result.intents)
        setConditions2(response.data.result.intents)
      }     
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
   getIntents2()
  
  },[])

  const addCondition= ()=>{
    setBox(true)
 
  }
  const removeCondition=()=>{
    setBox(false)
  
  }
  const handleAlert = (title='',body='',m1='',m2='',m3='')=>{
      setLogs({title,body,m1,m2,m3})
      setOpenDialog(true)
  }
  const handleApi = async(e)=>{
    e.preventDefault()
    if(props.onData1.title){
      const request={
        title:title,
        newOutput:{
          generic:[{
            response_type:'text',
            values:lista,
            selection_policy:'random'
          }],
        }
      }
      console.log('request',request)
    try{
      const response = await api.post('update-dialog', request)
     handleAlert('Ação de sucesso', 'Atualizado com sucesso')
     
     
    }catch(err){
      handleAlert('Ação de erro', 'Erro ao atualizar')
      
    }
    }else{
    let c1=''
    let c2=''
    let c3=''
    let mlc=''

    if(select1.current){
      c1=select1.current.value
    }
    if(select2.current){
      c2=select2.current.value
    }
    if(select3.current){
      c3=select3.current.value
    }
    mlc=`${c1} ${c2} ${c3}`
    const mlc2=mlc.trim()
    const request={
      title:title,
      conditions:mlc2,
      output:{
        generic:[{
          response_type:'text',
          values:lista,
          selection_policy:'random'
        }],
      }
    }
    console.log('request',request)
    try{
      const response = await api.post('create-dialog', request)
      handleAlert('Ação de sucesso', 'cadastrado com sucesso')
      
    }catch(err){
      handleAlert('Ação de erro', 'Erro ao cadastrar')
      
    }
  }
}
  const addExample= ()=>{
      setLista([...lista, {text:''}])
  }
  const changeInput = (e,item,index,array__)=>{
    
     const newLista=[]
     lista.map((i,index_)=>{
       if(index_===index){
        newLista.push({
          text:e.currentTarget.value})
       }else{
       newLista.push({text:i.text})
     }})
    
     setLista(newLista)
     console.log(newLista)
  }
  const removeItemList = (e,item,index,array)=>{    
     const newList = []
     array.map((item_,index_,array_)=>{
        if(item_.text!==item.text){
          newList.push({text:item_.text})
        }
     })
     setLista(newList)     
  }
const setTitleFunc = (e)=>{
  if(props.onData1.title===undefined){
   setTitle(e.target.value)
}else{
  setTitle(title)
  handleAlert('Ação não permitida',
  'voce não pode mudar o ID da resposta',
  '* voce pode apagar e criar uma nova',
  '* voce pode adicionar novos exemplos',
  '*voce nao pode mudar a condição já criada')
}
}
 return(
   <Modal 
    style={stylesheet}
    className={props.className?"modal-open":"modal-close"}
    isOpen={props.isOpen}
    onAfterOpen={props.onAfterOpen}
    onRequestClose={props.onRequestClose}
    ref={props.container}>
            <Dialog 
                open={openDialog} 
                onClose={()=>{setOpenDialog(false)}}
                clickButton={()=>{fecharmodal()}} 
                title={logs_de_alert.title}   
                body={logs_de_alert.body}    
                message1={logs_de_alert.m1} 
                message2={logs_de_alert.m2} 
                message3={logs_de_alert.m3}                  
                /> 
      <div className="container-modal">
        <header className="header">      
            <button className="addCondition" onClick={()=>{props.onRequestClose()}}>
            <FaLongArrowAltLeft className="arrow-left" size={30}/>
            </button>           
            <div>| Resposta:{title}</div>             
        </header>
        <div className="form">          
            <div>
              <h3>Escolha o ID único de resposta:</h3>
              <input value={title} onChange={(e)=>{setTitleFunc(e)}}></input>
            </div>         
            <>    
            <h3>Escolha a condição de entrada da resposta:</h3>  
            <form 
              onSubmit={(e)=>{handleApi(e)}}>      
            <select ref={select1}>         
            {conditions && conditions.map((c,__index,_array)=>{
              return(
                <option 
                  key={__index}                  
                  value={`#${c.intent}`}>{c.intent}
                </option>
              )
            })}
            </select>
            {box && 
            <>
             <select ref={select2} className="e-ou">         
              <option value={e_ou.e}>E</option>
              <option value={e_ou.ou}>OU</option>
            </select>
            <button disabled={!box} className="addCondition"onClick={()=>{removeCondition()}}>
             <FaTrashAlt className="icon-i" size={20}/>           
            </button> 
            <select ref={select3}>         
            {conditions2 && conditions2.map((c,__index,_array)=>{
              return(
                <option 
                  key={__index}
                  
                  value={`#${c.intent}`}>{c.intent}</option>
              )
            })}
            </select>
            </>
            }
             {props.onData1.title===undefined?
             (<button type="submit"className="cadastrar-button">          
               <p>Salvar</p> 
               <FaRegPlusSquare className="icon-s" size={20}/> 
            </button>
            ):(
              <button type="submit"className="cadastrar-button">          
               <p>Atualizar</p> 
               <FaRegPlusSquare className="icon-s" size={20}/> 
            </button>
            )}                        
            </form>   
            {props.onData1.title===undefined?(
                <button disabled={box} className="addCondition"onClick={()=>{addCondition()}}>
                <FaRegPlusSquare className="icon-i" size={20}/>           
                </button>
              ):(
                <button disabled={true} className="addCondition"onClick={()=>{addCondition()}}>
                <FaRegPlusSquare className="icon-i" size={20}/>           
                </button>
              )}  
          </>         
          
          
        </div>
        <div className="examples">
          <h3>Insira os exemplos de respostas abaixo:</h3>
          {lista && lista.map((item,index,array__)=>{
            return(
              <div className="div-map" key={index}>
              <p>{index+1}</p>
              <input 
               value={item.text} 
               onChange={(e)=>{changeInput(e,item,index,array__)}}
               className="input-example"></input>
              <button className="addCondition" onClick={(e)=>{removeItemList(e,item,index,array__)}}>
                <FaTrashAlt disabled={false} className="icon-i" size={20}/> 
              </button>
              </div>
            )
          })}
              <button className="addExample" onClick={()=>{addExample()}}>Adicionar exemplo:
                <FaRegPlusSquare disabled={false} className="icon-i" size={25}/> 
              </button>
            
        </div>
      </div>
   </Modal>
 )
}

export default ModalComponent;
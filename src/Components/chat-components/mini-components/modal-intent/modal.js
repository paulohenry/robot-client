import React,{useEffect,useState,useRef} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css'
import {stylesheet} from './stylesheet'
import Modal from 'react-modal'
import {FaLongArrowAltLeft,FaRegPlusSquare,FaTrashAlt} from 'react-icons/fa'
import {parseISO, format} from 'date-fns'
import Dialog from '../../../dialog/dialog'
import axios from 'axios'


Modal.setAppElement(document.getElementById('root'))

const ModalComponent = (props)=>{
  
  const[logs_de_alert, setLogs]=useState({
    title:'',
    body:'',
    message1:'',
    message2:'',
    message3:'',
  })
  const[intent, setIntent]=useState('')
  const containerIntent = useRef()

  const[description, setDescription]=useState('')
  const containerDescription = useRef()

  const[addExample, setAddExamples]=useState('')
  const containerExample = useRef()

  const[listArray, setListArray] = useState([])

  const[disableAdd, setBtnAdd]=useState(true)
  const[openDialog, setOpenDialog]=useState(false)
  
  const [checkTable, setCheckTable]=useState(false)

  const [trash, setTrash]=useState(true);

  useEffect(()=>{
    
    if(props.onData.intent!== undefined){
    setIntent(props.onData.intent)
    setDescription(props.onData.description)
    const newList = formatedList(props.onData.examples)    
    setListArray(newList)    
    }
  
  },[])

  
  useEffect(()=>{      
      let contador = 0
      listArray.map(l=>{
          if(l.check===true){
            if(contador===0){
            contador++
            }
          }
      })
      if(contador>0){
        setTrash(false)
      }else{
        setTrash(true)
      }
      console.log(contador)
},[listArray])


const removeExample = async()=>{  
    let text = ''
    let contador = 0
    const newArray=[]
    listArray.map((l)=>{
        if(l.check===true){
          contador++
          text=l.text         
        }else{
          newArray.push({
            text:l.text,
            created:l.created,
            updated:l.updated,
            check:false
          })
        }
    })
    if(contador!==1){
      handleAlert('Ação não permitida','Você pode deletar apenas um item por vez')
    }else{
      try{
        const {
          ibm_api_key, 
          ibm_url ,
          ibm_skill_id } = JSON.parse(localStorage.getItem('userDatas'))
        const ip = JSON.parse(localStorage.getItem('ipconfig'))
        const result = await axios.post(`${ip}/delete-example`,{
          ibm_api_key, 
          ibm_url ,
          ibm_skill_id,
          intent:intent,
          text:text
      })
      setListArray(newArray)
      handleAlert('Notificação de sucesso','Deletado com sucesso')
      console.log(result)
      }catch(err){
         handleAlert('Notificação de erro',toString(err))
         console.log(err)
        
       }
      }   
}


  const fecharmodal=()=>{
    if(!(props.onData.intent===undefined)){    
      setOpenDialog(false)
    }else{
       props.onRequestClose()
    }
    
  }
  
  const formatedList = (lista)=>{
      const provArray=[]
      lista.map((l)=>{
        provArray.push({
          text:l.text,
          created:convertData(l.created),
          updated:convertData(l.updated),
          check:false
        })      
      })    
      return provArray 
  }
  const setChecked = (e, example, index,array)=>{
    
     const filterList = []
      array.map((l,_index)=>{
        if(_index === index){
          if(l.check===true){
            filterList.push({
              text:l.text,
              created:l.created,
              updated:l.updated,
              check:false
            })
           
          }else{
            filterList.push({
              text:l.text,
              created:l.created,
              updated:l.updated,
              check:true
            })
          }
        }else{
          filterList.push({
            text:l.text,
            created:l.created,
            updated:l.updated,
            check:l.check
          })
        }
     })
     setListArray(filterList)
    
  }
  const handleCreateExample = async(e)=>{
    e.preventDefault()
     try{
       const {
        ibm_api_key, 
        ibm_url ,
        ibm_skill_id} = JSON.parse(localStorage.getItem('userDatas'))
       const ip = JSON.parse(localStorage.getItem('ipconfig'))
       const response = await axios.post(`${ip}/create-example`,{
          ibm_api_key, 
          ibm_url ,
          ibm_skill_id,
          intent:intent,
          text:addExample
       })
       
        const newArray = []        
        newArray.push({
          check:false,
          text:response.data.result.text,
          created:response.data.result.created,
          updated:response.data.result.updated
        })
      const newList = formatedList(newArray)
      listArray.map((l)=>{
        newList.push({
          check:false,
          text:l.text,
          created:l.created,
          updated:l.updated
        })
      })
      setListArray(newList) 
      handleAlert(
        'Ação concluida com sucesso',
        `Novo exemplo cadastrado com sucesso`)    
        setAddExamples('')              
     }catch(err){
      handleAlert(
        'Ação nao permitida',
        `Erro ao cadastrar novo exemplo`,
        `verifique sua internet ou processo backend do robo`,
        `verifique se a intenção já esta cadastrada`,
        `Em caso de persistir o erro, entre em contato com suporte`)  
     }
  }
  const handleCreateContext =async(e)=>{
    e.preventDefault()
      if(props.onData.intent===undefined){           
          
          try{
            const {
              ibm_api_key, 
              ibm_url ,
              ibm_skill_id } = JSON.parse(localStorage.getItem('userDatas'))
            const ip = JSON.parse(localStorage.getItem('ipconfig'))
            const response=await axios.post(`${ip}/create-intent`,{
            ibm_api_key, 
            ibm_url ,
            ibm_skill_id,
            intent:intent,
            description:description,            
          })
           handleAlert(
             'Ação concluida com sucesso',
             `Novo contexto cadastrado com sucesso`)  
          setIntent('')  
          setDescription('')  
          setAddExamples('')        
        }catch(err){
          handleAlert(
            'Ação nao permitida',
            `Erro ao cadastrar novo contexto`,
            `verifique sua internet ou processo backend do robo`,
        `verifique se a intenção já esta cadastrada`,
        `o titulo da intenção aceita apenas letras ou numeros`)  
        }
      }
  }
  const inputChanged=(e)=>{       
      switch (e.currentTarget.id) {
        case 'contexto':
           if(props.onData.intent===undefined){
             let target = e.currentTarget.value
             let newValue = target.replace(" ", '_')
             setIntent(newValue)
            }else{               
                handleAlert(
                  'Ação não permitida',
                  `Você não pode mudar um contexto já criado, caso queira criar um contexto
                  novo ou apaga-lô retorna a tela de criação de contexto. Nessa tela você pode:`,
                  'Editar a descrição de um contexto',
                  'Adicionar um novo exemplo de contexto',
                  'Remover um exemplo de contexto',
                )
            }          
          break;
        case 'descricao':
          setDescription(e.currentTarget.value)
          break;
        case 'exemplo':
          setAddExamples(e.currentTarget.value)
          break;      
        default:
          break;
      }
    }
    
  const handleAlert=(
    title='seu titulo',body='seu corpo',message1='',message2='',message3='')=>{
    if(props.onData.intent!== undefined){
      setIntent(intent)
      setLogs({
        title:title,
        body:body,
        message1:message1,
        message2:message2,
        message3:message3,
        }) 
      setOpenDialog(true)
      
    }else{   
      setLogs({
        title:title,
        body:body,
        message1:message1,
        message2:message2,
        message3:message3,
        }) 
    setOpenDialog(true)
    //setar aqui a mesagem do alert   
    }
  }
  
  useEffect(()=>{
    
    if(addExample.length > 1){
        setBtnAdd(false)
    }else{
      setBtnAdd(true)
    }
  },[addExample])

  const convertData = (data)=>{
    
    const parse =  parseISO(data)
    const formattedDate= format(parse, "dd-MM-yyyy")
    return formattedDate     
 }
  return  (
        <Modal
            style={stylesheet}
            className={props.className?"modal-open":"modal-close"}
            isOpen={props.isOpen}
            onAfterOpen={props.onAfterOpen}
            onRequestClose={props.onRequestClose}
            ref={props.container}                     
            > <Dialog 
                open={openDialog} 
                onClose={()=>{setOpenDialog(false)}}
                clickButton={()=>{fecharmodal()}} 
                title={logs_de_alert.title}   
                body={logs_de_alert.body}    
                message1={logs_de_alert.message1} 
                message2={logs_de_alert.message2} 
                message3={logs_de_alert.message3}                  
                />         
              <div className="header-modal">                
                  <FaLongArrowAltLeft
                    className="icon" 
                    onClick={()=>{props.onRequestClose()} }
                    color="rgb(15,98,254)"size={20}/>                
                <div>{`| nome do contexto: #${!intent?'Insira um novo contexto':intent}`}</div>                
              </div>
              <div className="body-modal">
                
                  <div className="inputs">
                    <form onSubmit={(e)=>handleCreateContext(e)}>                
                    <div>
                      <p>Nome do contexto</p>
                      <input
                      id="contexto" 
                      ref={containerIntent}
                      value={intent}
                      onChange={(e)=>{inputChanged(e)}}
                      placeholder="# digite o nome do contexto aqui"
                      />
                    </div>
                    <div>
                      <p>Descrição do contexto</p>
                      <input 
                      id="descricao" 
                      ref={containerDescription}
                      value={description}
                      onChange={(e)=>{inputChanged(e)}}
                      placeholder=" digite a descrição do contexto aqui"
                      />
                    </div>
                    {props.onData.intent!==undefined && <div>
                      <p>Exemplo de entrada de contexto:</p>
                      <input
                      id="exemplo" 
                      ref={containerExample}
                      value={addExample} 
                      onChange={(e)=>{inputChanged(e)}}
                      placeholder=" digite exemplos de entradas de contexto aqui"
                      />
                    </div>}
                    <div></div>
                    {props.onData.intent!==undefined?(
                    <button type="button" onClick={(e)=>{handleCreateExample(e)}} disabled={disableAdd} className="plus-ex">
                      Adicionar exemplo
                      <FaRegPlusSquare size={25}/>
                    </button>):(
                      <button type="submit" className="plus-ex">
                      Criar novo contexto
                      <FaRegPlusSquare size={25}/>
                    </button>
                    )}
                    </form>                  
                    {props.onData.intent!==undefined && 
                    <> 
                    <button 
                        disabled={trash}
                        onClick={()=>{removeExample()}}
                        className="rmvExample">
                           Remover exemplo
                      <FaTrashAlt size={25}/>
                      </button>                  
                  <table className="tables">
                  <thead className="modal-head-table">          
                    <th className="modal-head-td-intent">exemplos:</th>                   
                    <th className="modal-head-td-created">criado em:</th>
                    <th className="modal-head-td-conflict">atualizado em:</th>                             
                  </thead>
                  <div className="modal-tbody">
                  {listArray && listArray.map((example,index,array)=>{
                    return(
                    <tr key={index} className="modal-tbody-tr">
                      <td className="modal-tbody-tr-td-checkbox">
                      <Checkbox
                        checked={example.check}
                        onChange={(e)=>{setChecked(e,example,index, array)}}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                      </td>  
                      <td className="modal-tbody-tr-td-context">{example.text}</td>     
                      <td className="modal-tbody-tr-td-created">{example.created}</td>    
                      <td className="modal-tbody-tr-td-conflict">{example.updated}</td>                                      
                    </tr>)})} 
                    </div>                  
                  </table>
                  </>}
                </div>                
              </div>                
        </Modal>)
}

export default ModalComponent;
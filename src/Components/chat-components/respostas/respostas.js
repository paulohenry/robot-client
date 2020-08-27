import React,{useState,useEffect,useRef,createRef} from 'react';
import './style.css'
import { FaTrashAlt, FaRegPlusSquare} from 'react-icons/fa'
import axios from 'axios'
import Loading from '../../loading/loading'
import ModalDialog from '../mini-components/modal-dialog/modal-dialog'
import Dialog from '../../dialog/dialog'
import Checkbox from '@material-ui/core/Checkbox'

const Respostas = (props)=> {
  const [zerado, setZerado]=useState(false)
  const [dialog, setdialog]=useState([])
  const [loading, setLoading]=useState(false)
  const [trash, setTrash]=useState(true)
  const [aviso, setAviso]=useState('')
  const [modalOpen, setModalOpen]=useState(false)
  const [conteudoClickado, setConteudoClickado] = useState({})
  const [classModal, setClassModal]=useState(null)
  const containerModal = createRef();
    const [log_message, setLog]=useState({
    title:'',
    body:'',
    message1:'',
    message2:'',
    message3:'',
    open:false
  })

const handleAlert = (title,body,m1,m2,m3)=>{
   setLog({
     title,
     body,
     m1,
     m2,
     m3,
     open:true
    })
} 

 useEffect(()=>{
    getdialog()  
    console.log(dialog)
    console.log('usefect',dialog)
},[])

 const formatedList = (lista)=>{
   const copyArray = lista
  const newArray = []
  
  copyArray.map((l)=>{
   
  if(l.conditions!==undefined){
    if(l.conditions.includes("&&")){
      l.conditions=l.conditions.toString().replace("&&","E")
    }
    if(l.conditions.includes("#")){
      l.conditions=l.conditions.toString().replace("#"," ")
    }
    if(l.conditions.includes(" #")){
      l.conditions=l.conditions.toString().replace(" #"," ")
    }  
    if(l.conditions.includes("||")){
      l.conditions=l.conditions.toString().replace("||","OU")
    }  
  }else{
    l.conditions='sem parametro'
  }
    newArray.push({
        title:l.title,
        conditions:l.conditions,              
        check:false,
        output:l.output && l.output,
        dialog_node:l.dialog_node
    })         
  })
 
  return newArray;
 }
 
  const getdialog = async()=>{    
    setLoading(true)    
      try{
        const {
          ibm_api_key, 
          ibm_url ,
          ibm_skill_id
        } = JSON.parse(localStorage.getItem('userDatas'))
        const ip = JSON.parse(localStorage.getItem('ipconfig'))
        const res = await axios.post(`${ip}/list-dialog`,{
          ibm_api_key, 
          ibm_url ,
          ibm_skill_id
        })
        const formatedArray = formatedList(res.data.result.dialog_nodes)        
        setdialog(formatedArray)
        console.log('teste',formatedArray, dialog)
        setLoading(false) 
        setZerado(false)        
      }catch(error){
        setZerado(true)
        setLoading(false)
        setAviso(`
        nao foi possivel recuperar as informações 
        verifique sua internet e tente novamente`
        )
        console.log(error)
      }      
  }
  const changeCheck = (e,c,index,array)=>{
    const newList = []
    array.map((l,_index)=>{
      if(index === _index){
        if(c.check){
         newList.push({
          title:l.title,
          conditions:l.conditions,              
          check:false,
          output:l.output,
          dialog_node:l.dialog_node
          })
        }else{
        newList.push({
        title:l.title,
        conditions:l.conditions,              
        check:true,
        output:l.output,
        dialog_node:l.dialog_node
        })
       }
      }else{
        newList.push({
        title:l.title,
        conditions:l.conditions,              
        check:false,
        output:l.output,
        dialog_node:l.dialog_node
        })
      }
      
    })    
    setdialog(newList)
  }
const removerDialogo = async()=>{
    const copyList = dialog
    const newList = []
    const selectedItem = copyList.filter(l=>{
      if(l.check){
         return l.check
        }else{
        newList.push({
          title:l.title,
          conditions:l.conditions,              
          check:l.check,
          output:l.output,
          dialog_node:l.dialog_node
        })
      }
    })
    
    if(selectedItem[0].dialog_node){
      try{
        const {
          ibm_api_key, 
          ibm_url ,
          ibm_skill_id
        } = JSON.parse(localStorage.getItem('userDatas'))
      console.log('item selecionado', selectedItem)  
         const ip = JSON.parse(localStorage.getItem('ipconfig'))    
         const deleteItem = await axios.post(`${ip}/delete-dialog`,{
          ibm_api_key, 
          ibm_url ,
          ibm_skill_id,
          dialog_node:selectedItem[0].dialog_node
        })
        console.log(deleteItem)
        setdialog(newList) 
        handleAlert('mensagem de sucesso', 'Resposta removida com sucesso')
        
      }catch(err){
          console.log(err)
      }
    }
}

const openModal = (l)=>{    
    setClassModal(true)
    setModalOpen(true)
    setConteudoClickado(l)
}
const afterOpenModal = ()=>{

}
const closeModal = ()=>{
    setClassModal(false)
    setTimeout(()=>{
    setModalOpen(false)
      getdialog()
    },500)
}


useEffect(()=>{
  let contador=0
  const arrays = dialog
  console.log(arrays)
  arrays.map((l)=>{
      if(l.check===true){
        contador++
      }
    })
   if(contador===1){      
      setTrash(false)
      contador=0
   }else{
     setTrash(true)
   }
   if(arrays.length===0){
     setAviso(`Insira um dialogo para começar`)
   }
},[dialog])

 

  return(<>
      {modalOpen?(
      <ModalDialog
          container={containerModal}
          className={classModal}
          isOpen={modalOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          onData1={conteudoClickado}
        />):(
          <>
          <div className="container-response">
            <div className="header-response">
              <div className="text-response">
              <div className="texto-trash-response">
               <p>Cadastro de respostas do robô</p>
              </div>              
              </div>
              <button 
                onClick={()=>{removerDialogo()}}
                disabled={trash}
                className="trash-response">
              <div className="texto-trash-response">
                  <p>Remover</p>
                </div>
                <FaTrashAlt size={40}/>
                </button>
              <button
                onClick={(e)=>{openModal(e)}} 
                className="plus-response">           
                <p>Adicionar</p>
                <FaRegPlusSquare size={40}/>
              </button> 
            </div>
        </div>
        <table className=".table-response">
        <thead className="thead-table">
          <tr className="tr-thead-response">
            
            <th className="th-name">nome da resposta:</th>
            <th className="th-condition">condição de entrada:</th>
            <th className="th-quantities">quantidade de exemplos:</th>
          </tr>
        </thead>
        {!loading?(
          <tbody className="tbody-table">
          {dialog && dialog.map((l,index,array)=>{
            
            return(
              <tr
                className="tbody-tr-conteudo-response"                
                key={index}>
                  <td >
                  {l.conditions!=='anything_else' && <Checkbox
                      checked={l.check}
                      onChange={(e)=>{changeCheck(e,l,index,array)}}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> }                   
                  </td>                  
                  <td className="td-title"   onClick={()=>{openModal(l)}} >{l.title}</td>
                  <td className="td-condition">{l.conditions}</td>
                  <td className="td-qtd">{l.output!==undefined?(
                    l.output.text?l.output.text.values.length:
                    l.output.generic[0].values.length):
                    '0' }</td>
              </tr>

            )
          })}
        </tbody>):(
                <tbody>
                  <tr>
                    <td>
                    <Loading/>
                    </td>                  
                </tr>
                </tbody>
                )}
        </table>
        </>
        )}<Dialog
            open={log_message.open}
            onClose={()=>{setLog({open:false})}}
            clickButton={()=>{setLog({open:false})}}
            title={log_message.title}
            body={log_message.body}
            message1={log_message.message1}
            message2={log_message.message2}
            message3={log_message.message3}            
            />{zerado && <div className="aviso"><button>Sem contextos, insira um contexto para começar</button></div>}    
      </>)
}

export default Respostas;
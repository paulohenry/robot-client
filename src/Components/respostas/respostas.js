import React,{useState,useEffect} from 'react';
import './style.css'
import { FaTrashAlt, FaRegPlusSquare} from 'react-icons/fa'
import api from '../../Services/axios'
import Loading from '../mini-components/loading/loading'
const Respostas = ()=> {
  const [responses, setResponses]=useState([])
  const [loading, setLoading]=useState(false)
  const [trash, setTrash]=useState(true)
  
 const formatedList = (lista)=>{
  const newArray = []
  lista.map((l)=>{
    newArray.push({
        title:l.title,
        conditions:l.conditions?l.conditions:'sem condições',              
        check:false,
        output:l.output && l.output,
        dialog_node:l.dialog_node
    })         
  })
  console.log(newArray)
  return newArray;
 }
  const getResponses = async()=>{    
    setLoading(true)
      try{
        const res = await api.get('list-dialog')
        const formatedArray = formatedList(res.data.result.dialog_nodes)        
        setResponses(formatedArray)
        setLoading(false)
      }catch(error){        //provisorio - > exibir um alert
        console.log(error)
      }
  }
  const changeCheck = (e,conteudo,index,array)=>{
    const newList = []
    array.map((l,_index)=>{
      if(index === _index){
        if(conteudo.check){
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
    console.log(newList)
    setResponses(newList)
  }
const removerDialogo = async()=>{
  const itemPop=[]
  const newList=[]
  responses.map((l,index,array)=>{
      if(l.check){
        itemPop.push({
          title:l.title,
          conditions:l.conditions,              
          check:l.check,
          output:l.output,
          dialog_node:l.dialog_node
        })
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
  
  try{
    const response = await api.post('delete-dialog',{
      dialog_node:itemPop[0].dialog_node
    })
    console.log(response)
    setResponses(newList)
    if(newList.length===0){
    
    console.log('insira um dialogo para começar')
    }else{
     
    }
    // handleAlert('Messagem de sucesso', 'resposta deletada com sucesso')
    console.log('resposta deletada com sucesso')
  }catch(err){
    console.log(err)
    // handleAlert('Log de erro', 'erro ao tentar deletar a intencao',
    // 'verifique sua internet', 'verifique o processo de backend do robo',
    // 'em ultimo caso contate o suporte técnico')
  }
}
useEffect(()=>{

  let contador=0
    responses.map((l)=>{
      if(l.check===true){
        contador++
      }
    })
   if(contador===1){
      setTrash(false)
   }else{
     setTrash(true)
   }
},[responses])

  useEffect(()=>{
    getResponses()        
},[])
  return(<>
        <div className="container-response">
            <div className="header-response">
              <div className="text-response">
              <div className="texto-trash-response">
               <p>Cadastro de respostas do robô</p>
              </div>              
              </div>
              <button 
                onCLick={()=>{removerDialogo()}}
                disabled={trash}
                className="trash-response">
              <div className="texto-trash-response">
                  <p>Remover</p>
                </div>
                <FaTrashAlt size={40}/>
                </button>
              <button 
                className="plus-response">           
                <p>Adicionar</p>
                <FaRegPlusSquare size={40}/>
              </button> 
            </div>
        </div>
        <table className=".table-response">
        <thead className="thead-table">
          <tr className="tr-thead-response">
            <th className="th-check">
              <input 
                checked={false}
                type="checkbox"/>
            </th>
            <th className="th-name">nome da resposta:</th>
            <th className="th-condition">condição de entrada:</th>
            <th className="th-quantities">quantidade de exemplos:</th>
          </tr>
        </thead>
        {!loading?<tbody className="tbody-table">
          {responses.map((response,index,array)=>{
            return(
              <tr 
                className="tbody-tr-conteudo-response"
                key={index}>
                  <td className="td-check-input">
                    <input 
                      onChange={(e)=>{changeCheck(e,response,index,array)}}
                      checked={response.check}
                      className="check-input" 
                      type="checkbox"/>
                  </td>                  
                  <td className="td-title">{response.title}</td>
                  <td className="td-condition">{response.conditions}</td>
                  <td className="td-qtd">{response.output?response.output.text.values.length:'sem exemplos de resposta' }</td>
              </tr>

            )
          })}
        </tbody>:<Loading/>}
        </table>
        
  </>)
}

export default Respostas;
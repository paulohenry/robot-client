import React,{useState,createRef,useRef,useEffect} from 'react';
import Webcam from 'react-webcam'
import Dialog  from '../../../Components/dialog/dialog'
import { FaTrashAlt, FaCameraRetro} from 'react-icons/fa'
import {FiX, FiCamera} from 'react-icons/fi'
import  './style.css';
import Loading from '../../loading/loading'
import * as tf from'@tensorflow/tfjs';
import * as mobilenetModule from'@tensorflow-models/mobilenet';
import * as knnClassifier from'@tensorflow-models/knn-classifier/dist/knn-classifier';
import Reactotron from 'reactotron-react-js'


let mobilenet=null;
let classifier=null;

let interval = null

const constrains={
  height:200,
  width:400,
  facingMode:"user"    
}

const PlayGroundComponent = (props)=> {

  const camRef=useRef() 
  const enviarSofia=createRef()
  const camRefTest=createRef()
  const [classesList, setClasses] = useState([])
  const [disabledButton,setDisabledButton]=useState(true)
  const [TestModelCam, setTestModelCam]=useState(false)
  const [predictClass, setPredictClass]=useState(null)
  const[openDialog, setOpenDialog]=useState(false)
  const[loading,setLoading]=useState(true)
  const[logs_de_alert, setLogs]=useState({
    title:'',
    body:'',
    message1:'',
    message2:'',
    message3:'',

  })

  const load_files = async()=>{
    mobilenet = await mobilenetModule.load({
      version:2,
      alpha:1.0
    })    
    
    const dataSetKNN = JSON.parse(localStorage.getItem('dataSetKNN'))
    if(!dataSetKNN){
      classifier = knnClassifier.create()
      localStorage.setItem('dataSetKNN',[JSON.stringify([])])
    }else{
       classifier = knnClassifier.create()
       const datasetJson = localStorage.getItem('dataSetKNN');
       const datasetObj = JSON.parse(datasetJson);
      const dataset = fromDatasetObject(datasetObj);
     classifier.setClassifierDataset(dataset); 
     console.log(classifier)       
  }
    localMemory()
    setLoading(false)  
}

  const localMemory = ()=>{
    const localClassesSave = localStorage.getItem('classesList')     
    if(!localClassesSave){
    localStorage.setItem('classesList', [JSON.stringify([])])
     }else{
       const local2= JSON.parse(localStorage.getItem('classesList'))
      setClasses(local2)  
    }
  }
  
  useEffect(()=>{load_files()},[])
  useEffect(()=>{
    const interval = setInterval(()=>{
      test()
    },1000) 
    return ()=> clearInterval(interval)       
 },[predictClass])
  

  const addClasse=()=>{
    if(classesList!==null && classesList.length>=100){
      handleAlert('Aviso','não pode criar mais que 100 classes')      
    }else{     
        setClasses(s=>[...s, {
         title:'',
         countAmostrage:0,
         openCam:false,
         amostrage:[],         
         }        
        ])        
        
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

  const openCamera = (clique)=>{ 
    console.log(clique)
          const newList=[]         
          classesList.map((c_,index_,)=>{
                if(index_===clique){
                  if(c_.openCam===false){
                   return( 
                     newList.push({
                      title:c_.title,
                      countAmostrage:c_.countAmostrage,
                      openCam:true,
                      amostrage:c_.amostrage
                    }))
                  }else{
                    return(
                    newList.push({
                      title:c_.title,
                      countAmostrage:c_.countAmostrage,
                      openCam:false,
                      amostrage:c_.amostrage
                    })
                    
                    )
                  }
                    
                }else if(index_!== clique){
                  if(c_.openCam===true){
                    return (
                    newList.push({
                      title:c_.title,
                      countAmostrage:c_.countAmostrage,
                      openCam:false,
                      amostrage:c_.amostrage
                    }))
                  }else if(c_.openCam===false){
                    return(newList.push({
                      title:c_.title,
                      countAmostrage:c_.countAmostrage,
                      openCam:c_.openCam,
                      amostrage:c_.amostrage
                    }))
                  }                 
                }
               
             })
             setClasses(newList)
       }
    
    const inputChanged = (e,clique,array) => {         
        const newList = []
        
        array.map((c_,index_)=>{
          if(index_===clique){
           return(newList.push({
              title:e.currentTarget.value,
              countAmostrage:c_.countAmostrage,
              openCam:c_.openCam,
              amostrage:c_.amostrage
            }))
          }else{
           return(newList.push({
              title:c_.title,
              countAmostrage:c_.countAmostrage,
              openCam:c_.openCam,
              amostrage:c_.amostrage
            }))
          }
        })
        setClasses(newList)
    }

    const removeCard = (clique)=>{
        const newList=[]
        console.log(clique)
        classesList.filter((c_,index_)=>{
          if(index_!==clique){            
            return(
               newList.push({
                title:c_.title,
                countAmostrage:c_.countAmostrage,
                openCam:c_.openCam,
                amostrage:c_.amostrage
               })
            )
          }else{
            
             if(classifier.getNumClasses()>0){
               classifier.clearClass(c_.title)               
             }
            console.log(classifier)
          }       
        })
         if(newList.length===0){
           
         }
        setClasses(newList)
    }

    const closeAmostrage = (clique)=>{
      console.log(clique)
        const newList=[]
        classesList.map((c_,index_)=>{
          if(index_===clique){
            if(c_.openCam===true){
            return(
              newList.push({
                title:c_.title,
                countAmostrage:c_.countAmostrage,
                openCam:false,
                amostrage:c_.amostrage,
                
              })
             )
            }
          }else{
            return(
              newList.push({
                title:c_.title,
                countAmostrage:c_.countAmostrage,
                openCam:c_.openCam,
                amostrage:c_.amostrage
              })
            )
          }
        })
        setClasses(newList)
    }
    const addAmostrages = async(clique)=>{    
      console.log(clique)  
      const newList = []
      classesList.map(async(c_,index_)=>{        
          newList.push({
            title:c_.title,
            countAmostrage:c_.countAmostrage,
            openCam:c_.openCam,
            amostrage:c_.amostrage
          })
         if(clique===index_){   
         
          const img =  tf.browser.fromPixels(camRef.current.video)
          const logits_img =  mobilenet.infer(img, 'conv_preds')
          classifier.addExample(logits_img, classesList[clique].title)
          const screenShot = camRef.current.getScreenshot({width: 400, height: 200})
          let screenShot_64= null;
          if(screenShot.includes('data:image/jpeg;base64,')){
            const index_virgula = screenShot.indexOf('9')
            const slice_resolve= screenShot.slice(index_virgula)
            const bar_resolve = '/'.concat(slice_resolve)
            screenShot_64=bar_resolve
          }
          
          if(classesList[clique].amostrage.length===30){
            console.log('nao é possivel adicionar mais de 30 amostras')
          }else{
          newList[clique].amostrage.push({screenShot:screenShot_64})
          newList[clique].countAmostrage = newList[clique].amostrage.length
          setClasses(newList)
          localStorage.setItem('classesList', JSON.stringify(classesList))
         }
        }
      })       
    }

    const removerAmostrage=(index_images,index,classe)=>{
            const newClassesList=[]
            const newAmostras=[]
            classesList.map((c_,i_)=>{                          
                newClassesList.push({
                  title:c_.title,
                  countAmostrage:c_.countAmostrage,
                  openCam:c_.openCam,
                  amostrage:c_.amostrage
                })
            })
           
            classesList[index].amostrage.map((a_,index_)=>{
                if(index_!==index_images){
                  newAmostras.push({
                    screenShot:a_.screenShot
                  })
                }
            })
            newClassesList[index].amostrage=newAmostras
            newClassesList[index].countAmostrage=newAmostras.length
            
            setClasses(newClassesList)
            localStorage.setItem('classesList', JSON.stringify(classesList))
    }
    const toDatasetObject = (dataset)=>{
      const result = Object.entries(dataset).map(([classId,value], index) => {
          const data = value.dataSync();    
          return {
            classId: classId,
            data: Array.from(data),
            shape: value.shape
          };
       })    
      return result;
    };
    const fromDatasetObject = (datasetObject)=>{
      let res =  Object.entries(datasetObject).reduce((result, [_, {classId, data, shape}]) => {
        const tensor = tf.tensor2d(data, shape);
        result[classId] = tensor;  
        console.log('interacao',datasetObject)
        console.log(result)
        return result;
      }, {})     
      return res    
    }

  const enviarParaSofhia = ()=>{
    if(classesList.length>0){
      if(classesList[0].countAmostrage > 0){
        try{
          localStorage.setItem('classesList', JSON.stringify(classesList))

          const dataset = classifier.getClassifierDataset();
          const datasetOjb = toDatasetObject(dataset);
          const jsonStr = JSON.stringify(datasetOjb);
          localStorage.setItem('dataSetKNN', jsonStr);
          console.log(classifier)      
          clearInterval(interval)
          handleAlert('Aviso','Enviado com sucesso')    
          setTestModelCam(false)          
          setPredictClass('')

        }catch(error){
          console.log(error)
          handleAlert('Aviso','Não foi possivel concluir a açao',
          'verifique sua internet','verifique o processo de backend do robo',
          'ou entre em contato com o suporte')
        }            
      }else{
       handleAlert('Aviso','inclua amostras na sua classe',
       'após abrir a camera de testes e testar', 'enviar para a sofhia')
      }      
    }else{
      handleAlert('Aviso','Você deve criar uma classe antes')      
    }
   }

    const test = async()=>{     
      if(camRefTest.current!==null){   
      
    const img =  tf.browser.fromPixels(camRefTest.current.video)
    const  xlogits = mobilenet.infer(img,'conv_preds');
    try{
      const predict1 = await classifier.predictClass(xlogits)
      setPredictClass(predict1.label)
      console.log(predict1.label)
    }catch(error){console.log(error)}
        
      }else{
        setPredictClass('')
        clearInterval(interval)
        
      }
  }

    const openCamTest = ()=>{
      if(classesList.length>0){
        if(classesList[0].countAmostrage > 0){
          if(TestModelCam===false){
            setTestModelCam(true)
             
               setDisabledButton(false)
            
          }else{
            setTestModelCam(false)
            clearInterval(interval)
            setPredictClass('')
            setDisabledButton(true)
          }
        }else{
         handleAlert('Aviso','inclua amostras na sua classe',
         'após abrir a camera de testes e testar', 'enviar para a sofhia')
        }      
      }else{
        handleAlert('Aviso','Você deve criar uma classe antes')      
     }
    }
  return (
    <>
       {!loading? (
         <>
          <div className="container">
            <div className="container-cards">
              {classesList && classesList.map((classe,index,array)=>{
                return(
                  <div 
                    key={index}
                    className="card">
                      <div className="header"> 
                        <input 
                        type="text"
                        placeholder="Insira sua classe"
                        className="input-class"               
                        value={classe.title} 
                        onChange={(e)=>{inputChanged(e,index,array)}}/>   
                        <FaTrashAlt onClick={()=>{removeCard(index)}}className="icon-trash-card"/>  
                      </div>                            
             <p>{classe.countAmostrage===0?'Adicione amostras':`Numero de amostras:'${classe.amostrage.length}`}</p>
                      <div className="container-button-image">
                      {classe.openCam && 
                          <Webcam 
                            screenshotFormat = "image/jpeg"
                            ref={camRef}
                            className="webcam"
                            mirrored="true" 
                            videoConstraints={constrains}/>
                            }
                      <button  onClick={()=>{openCamera(index)}}>
                        {classe.openCam===false && <FaCameraRetro className="icon-cam-card"/>}
                      </button>
                      <div className="container-mini-image">
                       {classe.openCam===false && classe.amostrage.map((item_,index_) =>{
                         return(
                            <img className="mini-image"
                              key={index_}
                              src={`data:image/jpeg;base64,${item_.screenShot}`}/>
                           )
                       })}
                       </div>
                       </div>
                      {classe.openCam===true && 
                        (<div className="amostrage-view">
                           <div className="container-amostrage">
                             <div className="exit-amostrage">
                               <FiX onClick={()=>{closeAmostrage(index)}}/>
                             </div>
                            <header className="menu-amostrage">
                              <input 
                                type="text"
                                placeholder="Insira sua classe"
                                className="input-class"               
                                value={classe.title} 
                                onChange={(e)=>{inputChanged(e,index,array)}}/>  
                              <FiCamera onMouseDown={async()=>{await addAmostrages(index)}} className="icon-add-cam"/>                              
                            </header>
                            <div className="body-amostrage">
                                {classe.amostrage?(
                                  classe.amostrage.map((imageItem,index_images,a_images)=>{
                                   
                                    return(
                                       <div                                         
                                        className="image-amostrage"
                                        key={index_images}                                        
                                        style={{backgroundImage:`url(data:image/jpeg;base64,${imageItem.screenShot})`}}
                                        onClick={()=>removerAmostrage(index_images,index,classe)}>                                                                                  
                                        <div className="remover">remover</div>
                                       </div>
                                     )
                                  })
                                ):(                              
                                    <p className="no-element">
                                    Clique na camera para inserir amostras 
                                    </p>
                                  
                                )}
                              </div>
                            </div>                          
                          </div>)}
                  </div>
                )
              })}
              <button className="add-card" onClick={()=>{addClasse()}}>adicionar classe</button>
            </div>
          <div ref={enviarSofia}className="container-train">
          <button onClick={()=>enviarParaSofhia()}className='enviar-sofia-enable'>
                  Enviar para sofhia
              </button>
          </div>
          <div className="container-test">
            {TestModelCam && 
                <>
              <div className="div-test">
              <button disabled={disabledButton} className="b1" onClick={()=>{test()}}>
                  Iniciar Teste
              </button>
              <Webcam
              className="camera-de-teste"
              screenshotFormat = "image/jpeg"
              ref={camRefTest}
              mirrored="true" 
              videoConstraints={constrains}>
                <p>fechar</p>
              </Webcam>
               <h1 className="titlePredict">{predictClass===null?'':`${predictClass}`}</h1>
             </div>            
            </>              
            }
             <button className={classesList===null?'enviar-sofia-disable':'enviar-sofia-enable'}
             onClick={()=>{openCamTest()}}> 
             {!TestModelCam? 'Abrir camera de teste':'Fechar'}
            </button>
          
          </div>
        
        </div>
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
        </>
       ):(
       <div className="div-loading">
         <Loading/>
        </div>) 
        }</>
  );
}

export default PlayGroundComponent;
 
 
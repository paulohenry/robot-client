import React,{useState,createRef,useRef,useEffect} from 'react';
import Webcam from 'react-webcam'

import { FaTrashAlt, FaCameraRetro} from 'react-icons/fa'
import {FiX, FiCamera} from 'react-icons/fi'
import  './style.css';

import * as tf from'@tensorflow/tfjs';
import * as mobilenetModule from'@tensorflow-models/mobilenet';
import * as knnClassifier from'@tensorflow-models/knn-classifier';

import {ClassifierBar} from './style'

let mobilenet=null;
let classifier=null;

let interval = null

const constrains={
  height:200,
  width:400,
  facingMode:"user"    
}

const PlayGroundComponent = (props)=> {

  const [classesList, setClasses] = useState([])
  const camRef=useRef()
  const camRefTest=createRef()
  const [TestModelCam, setTestModelCam]=useState(false)
  const [t, st]=useState(false)


  const load_files = async()=>{
     classifier = knnClassifier.create()
     mobilenet = await mobilenetModule.load({
       version:2,
       alpha:1.0
     })
    console.log('carregou', mobilenet,classifier)
  }
  useEffect(()=>{
    load_files()   
  },[])


  const addClasse=()=>{
    if(classesList.length>=4){
      console.log('nao pode mais que 2')
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
  const getRandomColor = ()=> {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
          }       
        })
         
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
    const addAmostrages = (clique)=>{    
      console.log(clique)  
      const newList = []
      classesList.map((c_,index_)=>{        
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
          console.log(classifier,img,logits_img)
          const screenShot = camRef.current.getScreenshot({width: 400, height: 200})
          let screenShot_64= null;
          if(screenShot.includes('data:image/jpeg;base64,')){
            const index_virgula = screenShot.indexOf('9')
            const slice_resolve= screenShot.slice(index_virgula)
            const bar_resolve = '/'.concat(slice_resolve)
            screenShot_64=bar_resolve
          }
          
          if(classesList[clique].amostrage.length===100){
            console.log('nao é possivel adicionar mais de 30 amostras')
          }else{
          newList[clique].amostrage.push({screenShot:screenShot_64})
          newList[clique].countAmostrage = newList[clique].amostrage.length
          setClasses(newList)
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
            console.log('indice da imagem',index_images,'indice da classe', index,'a classe aberta', classe )

    }
   
    const test = async()=>{      
      const screenShot_64= null;
      if(camRefTest.current!==null){
     
    const img =  tf.browser.fromPixels(camRefTest.current.video)
    const  xlogits = mobilenet.infer(img,'conv_preds');
    const predict = await classifier.predictClass(xlogits)
    console.log('Predição:',predict);
      }else{ clearInterval(interval)}
  }
    
   const TestModelFunc = ()=>{
     interval=setInterval(test,1000) 
   }     
    
    const openCamTest = ()=>{
      if(classesList.length>0){
        if(classesList[0].countAmostrage > 0){
          if(TestModelCam===false){
            setTestModelCam(true)
             
          }else{
            setTestModelCam(false)
            clearInterval(interval)
          }
        }else{
          console.log('inclua amostras na sua classe')
        }      
      }else{
      console.log('Você deve criar uma classe antes')
     }
    }
  return (
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
                              <FiCamera onMouseDown={()=>{addAmostrages(index)}} className="icon-add-cam"/>                              
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
          <div className="container-train">
                      
          </div>
          <div className="container-test">
            {TestModelCam ? (
              <>
             <div className="div-test">
             <button className="b1" onClick={()=>{TestModelFunc()}}>
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
              {Object.keys(classifier.classDatasetMatrices).map((c,index)=>{
                return(
                   <div key={index} className="classifier-name">
                      <p>{c}</p>  
                      <ClassifierBar 
                        percentPrevision={30}
                        colorBack={()=>{getRandomColor()}}/>                    
                   </div>
                )
              })}
             </div>
              </>
              ):(
              <button className="b1"onClick={()=>{openCamTest()}}> 
              Abrir camera de teste
            </button>
              )
            }
          
          </div>
        
        </div>     
  );
}

export default PlayGroundComponent;
 
 
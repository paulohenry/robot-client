import React,{useEffect,useState,useRef} from 'react';
import './style.css'
import ReactPlayer from 'react-player'
import Loading from '../../loading/loading'
import fluxograma from '../../../Assets/fluxograma.png'

function Video(props) {
  const play=useRef(null)
  const [loading, setLoading]=useState(true)

useEffect(()=>{   
      console.log(play)
      play.current===null?setLoading(true):setLoading(false)      
},[play])


  return(    
    <div className={props.className}>
    <ReactPlayer    
      ref={play}
      style={{marginTop:50, marginLeft:'30%'}}
      url={`https://www.youtube.com/watch?v=KNAWp2S3w94&origin:http://Localhost:8080`}
      controls={true}
    />
    <img src={fluxograma} alt="pdf"/>
    {loading && <Loading         
      className="loading"
    />}
  </div>
  )
}

export default Video;
import React,{useEffect,useState,useRef} from 'react';
import ReactPlayer from 'react-player'
import Loading from '../../Components/mini-components/loading/loading'


function Video() {
  const play=useRef(null)
  const [loading, setLoading]=useState(true)

useEffect(()=>{   
      console.log(play)
      play.current===null?setLoading(true):setLoading(false)      
},[play])


  return(    
    <>
    <ReactPlayer    
      ref={play}
      style={{marginTop:50, marginLeft:'30%'}}
      url={`https://www.youtube.com/watch?v=KNAWp2S3w94&origin:http://Localhost:8080`}
      controls={true}
    />{loading && <Loading         
      className="loading"
    />}
  </>
  )
}

export default Video;
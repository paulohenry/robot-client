import React from 'react'
import Lottie from 'react-lottie'
import * as loading from '../../Assets/animations/loading.json'
// import * as done from '../../../Assets/animations/done.json'

const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,    
    rendererSettings:{
      preserveAspectRatio:'xMinYMin slice'
    }
}

// const doneOptions={
//   loop: false,
//   autoplay: true,
//   animationData: done.default,    
//   rendererSettings:{
//     preserveAspectRatio:'xMinYMin slice'
//   }
// }

const Loading = (props)=>{
  return(
    <>
      {/* {props.loading?( */}
        <Lottie 
          options={loadingOptions}
          height={'100%'}
          width={'50%'}
          isStopped={false}
          isPaused={false}
          className={props.className}
          {...props}
          />
      {/* ):(
        <Lottie 
          options={doneOptions} 
          height={'70%'}
          width={'50%'}
          isStopped={false}
          isPaused={false}
          className={props.className}
          {...props}
          />
      )} */}
    </>
  )
}
export default Loading



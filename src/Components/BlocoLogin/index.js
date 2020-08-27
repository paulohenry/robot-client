import React from 'react'
import {Container,ContainerAluno,ContainerRobot}from './style'
import avatar from '../../Assets/avatar.jpg'
const BlockUsers= props => {
  return (
    <Container  onClick={(e)=>props.catchAndLog(e)}>
       <ContainerAluno>
        <img src={props.imgAluno?`data:image/jpeg;base64,${props.imgAluno}`:avatar}/>
        <h1>{`Treinador: ${props.nomeAluno}`}</h1>
       </ContainerAluno>
       <ContainerRobot>
        <img src={props.imgAluno?`data:image/jpeg;base64,${props.imgRobot}`:avatar}/>
        <h1>{`Robô: ${props.nomeRobot}`}</h1>
       </ContainerRobot>
       {props.clicked && 
          <div>
                <input value={props.valueRA}/>
                <button>Entrar</button>
          </div>
            
         }
    </Container>
  )
}

export default BlockUsers

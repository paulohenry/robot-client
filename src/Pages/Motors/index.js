import React,{useState,useRef,useEffect,} from 'react';
import {Container,Title} from './style'


function Motors() {

const [inputsArray, setInputsArray]=useState([
  {
    input:''
  }
])

  return (
    <Container>
        <Title>Aqui voce pode configurar quais os contextos em que o robô se movimenta</Title>
        {}
    </Container>);
}

export default Motors;
import React from 'react';
import maintenance from '../../../Assets/maintenance.svg'
import './style.css'
const Entidades = props => {
  return (
      <div className={props.className}>
         <h1>Estamos melhorando nossos serviços para melhor atende-lô</h1>
          <img src={maintenance}/>
      </div>
    );
}

export default Entidades;
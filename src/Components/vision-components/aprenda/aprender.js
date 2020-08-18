import React from 'react';
import {Polar} from 'react-chartjs-2'


const data = {
  datasets: [{
    data: [
      11,
      16,
      7,
      3,
      14
    ],
    backgroundColor: [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#3CFF00',
      '#36A2EB'
    ],
    label: 'My dataset' // for legend
  }],
  labels: [
    'Processamento de linguagem natural',
    'Reconhecimento Facil',
    'Reconhecimento de objetos',
    'Programação em Blocos',
    'Interação com Sofhia'
  ]
};
function Aprenda(props) {
  return  <div className={props.className}>   
    <Polar data={data}/>
  </div>
}

export default Aprenda;
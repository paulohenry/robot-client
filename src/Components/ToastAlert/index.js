import React from 'react';

import './styles'

function ToastAlert({props}) {
  return (
    props.visible===true && 
    <div
      color={props.alertType='sucess'}
      visible={props.visible=false}
      message={props.message='put your alert here'}
    ><p>{props.message}</p></div>
  )
}

export default ToastAlert;
import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
  *{
      margin:0;
      padding:0;
      outline:0;
      box-sizing: border-box;
  }

  html, body, #root{
    background-color:#9F06C9;
    min-height:100%;
    -webkit-font-smoothing: antialiased !important;
    display:flex;
    justify-content:center;
    flex-direction:column;
    overflow-y:hidden;
  }

`
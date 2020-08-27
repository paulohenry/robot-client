import styled from 'styled-components';

export const Container = styled.div`
position:relative;
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box; 
    background-color:#F4F4F4;
    min-height:100%;
    -webkit-font-smoothing: antialiased !important;
    overflow-y: scroll;
    overflow-x:hidden;
    min-height:100vh;  
    min-width: 100vw;  
    display:flex;
    flex-direction:column;   
    align-items:center;
    padding-top:5vh;
`;



export const Button = styled.button`

  color:#0F62FE;
  border:none;
  position:absolute;
  
  justify-self: center;
  align-self:center;
  left:2vw;
  top:5vh;
  height:20vh;
  
  width:20vh;
 
  box-shadow: 3px 3px 3px 3px rgba(0,0,0,0.1);
  font-size:32px;
  font-weight:bold;
  background-color:#FFF;
  border-radius:6px;

  &:hover {   
        background-color:#0F62FE;;
        color:#FFF;
        cursor:pointer;
        }
`

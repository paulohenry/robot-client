import styled from 'styled-components';

export const Container = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

export const Image = styled.img``

export const Titulo = styled.h1`
  color:rgba(0,0,0,0.7);
  margin-bottom:5vh;
`;

export const Input  = styled.input`

  margin-bottom:3vh;
  padding:5vh 10vh 5vh 10vh;
  width:80vw;
  font-size:32px;

`;

export const Button = styled.button`

  color:#FFF;
  border:none;
  padding:5vh 17vh 5vh 10vh;
  width:80vw;
  box-shadow: 3px 3px 3px 3px rgba(0,0,0,0.1);
  font-size:32px;
  font-weight:bold;
  background-color:rgba(15, 58, 199, 0.801);

  &:hover{
    cursor:pointer;
  }
`

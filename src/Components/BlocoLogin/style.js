import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    border-radius:6px;
    background-color:#FFF;
    padding:5vh 10vw 5vh 10vw;
    box-shadow:3px 3px rgba(0,0,0,0.1);
    height:50vh;
    max-height:50vh;
    min-height:50vh;
    width:70vw;
    max-width:70vw;
    min-width:70vw;
    margin-bottom:5vh;
       &:hover {
      background-color:rgb(15,98,254);
    }
     &:hover  h1 {
       color:#FFF;
     }

 
`; 

export const ContainerAluno = styled.div`
   display:flex;   
   align-items:center;
   
   & > img{
      
      max-height:20vh;
      
      max-width:20vw;
      border-radius:50%;      
    }
    & > h1{
      color:#0F62FE;
      margin-left:30px;

      
    }
`;

export const ContainerRobot= styled.div`
   display:flex;   
   align-items:center;
   margin-top:2vh;
   & > img{
    
      max-height:20vh;
      
      max-width:20vw;
      border-radius:50%;      
    }
    & > h1{
      color:#0F62FE;
      margin-left:30px;
    }
`;
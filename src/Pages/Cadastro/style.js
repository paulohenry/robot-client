import styled,{keyframes} from 'styled-components';
import Typical from 'react-typical'
import {FaPhotoVideo, FaBan} from 'react-icons/fa'
import Webcam from 'react-webcam'
import Loading from '../../Components/loading/loading'



export const LoadingComponent = styled(Loading)`
    position: absolute;
    display:flex;
    justify-content: center;
    align-items: center;
    left:30vw;
    top:10vh;
    z-index: 10;
    height:15vh;
    width:15vh;
`

export const Voltar = styled.button`
  position:absolute;
  left:1vw;
  top:1vw;
  z-index: 5;
  height:15vh;
  width:15vh;
  color:#F4F4F4;
  border:none;
  transition:transform 0.2s;
  background-color:#FFF;
  box-shadow:3px 3px rgba(0,0,0,.1);

  &:hover{

    cursor: pointer;
  background-color:rgb(15,98,254);
  color:#FFF;
  transform: scale(1.1);
  }

`

const fade_in =  keyframes` 
        from{
          opacity:0;
        }
        to{
          opacity:100;
        }

`

export const WebcamComponent = styled(Webcam)`
    position:relative;
    z-index:1;
    margin-left:2.5vw;
`

export const Container = styled.div`
  display:flex;
  flex-direction:column;
  height:100vh;
  width:100vw;
  position:relative;
  align-items:center;
  text-align:center;
  padding:5vh 20vw 0 20vw;
`;
export const ImageContainer = styled.div`
    display:flex;   
    
`;

export const Form = styled.form`
   display:flex;
   flex-direction:column;
   width:60vw;
`;
export const Input = styled.input`
      flex:1;
      height:100%;
      width:60vw;
      padding:3vh 0 3vh 0;
      font-style:italic;
      font-size:3vh;
      text-align:center;
      animation:${fade_in} 0.2s linear;

     
`;
export const Button = styled.button`
      height:100%;
      width:60vw;
      padding:3vh 0 3vh 0;
      background-color:rgb(15,98,254);
      font-size:3vh;
      border:none;
      box-shadow: 3px 3px rgba(0,0,0,0.1);
      font-weight:bold;
      color:#FFF;
      animation:${fade_in} 0.2s linear;     
      margin-right:5vw;
      &:hover{
        cursor:pointer;
      }
`;

export const TypicalStylized = styled(Typical)`
    
    font-weight:bold;
    font-size:5vh;
    margin-bottom:5vh;
`
export const MagicImage = styled.img`
    height:20vh;
    width:20vh;
    margin-bottom:5vh;

`
export const ContainerButtons4 = styled.div`
      display:flex;
      justify-content:space-between;
      width:50vw;
      height:20vh;
      
`
export const AvatarImage = styled.img`
    height:20vh;
    width:20vh;
    border:50%;
    margin-left:3vw;
    margin-bottom:5vh;
    border-radius:50%;
    border:${props=>props.avatarSelected===true?'5px solid rgb(15,98,254)':'none'};
    &:hover{
      border:5px solid rgb(15,98,254);
      cursor:pointer;
    }
    

`
export const PictureContainer = styled.div`
    position:relative;
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:2vw;
    border-radius:5%;
    border: 3px solid rgb(15,98,254);
    border-style:dashed;

`
export const ContainerSelf = styled.div`
    display:flex;    
    width:33vw;
    margin-bottom:5vh;
    position:relative;
    z-index:5;
    
`
export const Pic = styled.img`
`
export const IconPhoto = styled(FaPhotoVideo)`
  color:rgb(15,98,254);
  font-size:15vh;
`
export const IconX = styled(FaBan)`
      height:5vh;
      width:5vh;
      color:red;
      position:absolute;
      left:0;
      top:0;

      &:hover{
        cursor:pointer;
      }
`

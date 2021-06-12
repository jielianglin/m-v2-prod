import React from 'react'; 
import Button from "@material-ui/core/Button";
import homeIcon from "./icons/homeIcon/homeIcon.png"


export default function HomeIconButton(props){
return(
    <Button>    
    <img src={homeIcon} alt="" width="130px" onClick={() => { 
    props.showHomeIconText();
    }} />
  </Button>  
        );
}
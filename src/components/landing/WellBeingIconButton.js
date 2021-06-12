import React from 'react'; 
import Button from "@material-ui/core/Button";
import wellBeingIcon from "./icons/wellBeingIcon/wellBeingIcon.png"

export default function WellBeingIcon(props){
  
    return(
        <Button>
    <img src={wellBeingIcon} alt="" width="130px" onClick={()=> {props.showWellBeingIconText();}} />
 </Button>
    ); 
}
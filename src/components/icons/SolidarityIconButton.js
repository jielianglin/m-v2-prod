import React from "react";
import solidarityIcon from "./solidarityIcon/solidarityIcon.png"

const showText = () => {
return("Explanation of Solidarity"); 
}

export default function homeIconButton(){
    return(<img src={solidarityIcon} alt="" width="130px" onClick={showText} />
        );
}
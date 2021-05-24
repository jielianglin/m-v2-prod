import React from "react";
import wellBeingIcon from "./wellBeingIcon/wellBeingIcon.png"

const showText = () => {
return("Explanation of WellBeing"); 
}

export default function WellBeingIcon(){
    return(<img src={wellBeingIcon} alt="" width="130px" onClick={showText} />
        );
}
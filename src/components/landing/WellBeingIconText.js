import React from "react";
import Typography from '@material-ui/core/Typography'
import P5Mold from '../upload/annotation/P5Mold'; 
import WellBeingUpload from './WellBeingUpload'; 

export default function WellBeingIconText() {
    return(
        <div>
        <Typography variant="h4" style={{textAlign:"center"}}>Well-Being</Typography>
        <Typography style={{margin: "50px"}}> Wellbeing takes different shapes in different territories. 
        In some there are collective practices while in others individuals. 
        The meaning of this word will be explored, and as well multi-cultural 
        rituals for wellbeing.
        </Typography>
        <WellBeingUpload/>
        </div>
    );
}
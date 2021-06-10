import React from "react";
import Typography from "@material-ui/core/Typography"; 
import SolidarityUpload from './SolidarityUpload'; 

export default function SolidarityIconText() {
    return(
        <div>
        <Typography variant="h2" style={{textAlign:"center"}}> Solidarity </Typography>
        <Typography style={{margin: "50px"}}>
          Under the topic solidarity, the connection and empathy towards one another will be strengthened. Acknowledging the different backgrounds, migration stories and experiences, the search is to create a deeper understanding of one another and explore the presence of solidarity and the absence of judgment. 
        </Typography>
        <div style={{display:"block", margin:"0 auto", width:"50%"}}>
        <SolidarityUpload/> 
        </div>
        </div>
            );
        }
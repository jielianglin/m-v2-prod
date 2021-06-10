import React from "react";
import Typography from '@material-ui/core/Typography'
import P5Lasso from "../upload/annotation/P5Lasso";

export default function HomeIconText() {
    return(
        <div>
        <Typography variant="h2" style={{textAlign:"center"}}> Home </Typography>
        <Typography style={{margin: "50px"}}> Home can be a topic that generates contradictory feelings 
            for people who migrated at a point of their life. The question of what 
            and where is home is not an easy one when a home was left behind, or 
            the person feels trapped in liminality. Issues like having to adapt to 
            a new territory, searching for safe spaces and  a sense of belonging, are
            as well related. We would like to explore this topic from an embodied perspective 
            and to include memories, images and objects.
        </Typography>
    <div style={{display:"block", margin:"0 auto", width:"42%"}}>
    <P5Lasso/> 
    </div>
    </div>
    );
}
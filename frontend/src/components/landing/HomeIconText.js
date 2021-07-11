import React from "react";
import Button from "@material-ui/core/Button"; 
import Typography from '@material-ui/core/Typography'
import HomeUpload from "../landing/HomeUpload";
import UploadIMG from "../upload/uploadButton/uploadIMG/UploadIMG.png"; 

export default function HomeIconText() {
const [homeTheme, setHomeUpload] = React.useState(false); 

const changeState = () => {
    setHomeUpload(true); 
}
    if (homeTheme) {
        return (
            <div className="homeUpload">
            <HomeUpload/> 
            </div>); 
        } else { 
            return(
                <div className="home">
        <Typography variant="h2" style={{textAlign:"center"}}> Home </Typography>

        <Typography style={{margin: "50px"}}> 
            Home can be a topic that generates contradictory feelings 
            for people who migrated at a point of their life. The question of what 
            and where is home is not an easy one when a home was left behind, or 
            the person feels trapped in liminality. Issues like having to adapt to 
            a new territory, searching for safe spaces and  a sense of belonging, are
            as well related. We would like to explore this topic from an embodied perspective 
            and to include memories, images and objects.
        </Typography>

        <div style={{display: "flex", justifyContent:"center"}}>
        <Button className="homeUploadButton" onClick={changeState}>
        <img src={UploadIMG} width="110px" alt="" />
        </Button> 
        </div>
        </div>);

    }
}
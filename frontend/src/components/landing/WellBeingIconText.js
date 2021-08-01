import React from "react";
import Typography from '@material-ui/core/Typography'
import WellBeingUpload from './WellBeingUpload';
import Button from "@material-ui/core/Button";
import UploadIMG from "../upload/uploadButton/uploadIMG/UploadIMG.png";

export default function WellBeingIconText() {
    const [wellBeingTheme, setWellBeingUpload] = React.useState(false);

    const changeState = () => {
        setWellBeingUpload(true);
    }
    if (wellBeingTheme) {
        return (
            <div className="wellBeingUpload">
                <WellBeingUpload />
            </div>);
    } else {
        return (
            <div>
                <Typography variant="h4" style={{ textAlign: "center" }}>Well-Being</Typography>
                <Typography style={{ margin: "50px" }}> Wellbeing takes different shapes in different territories.
                    In some there are collective practices while in others individuals.
                    The meaning of this word will be explored, and as well multi-cultural
                    rituals for wellbeing.
                </Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button className="wellBeingUploadButton" onClick={changeState}>
                        <img src={UploadIMG} width="110px" alt="" />
                    </Button>
                </div>
            </div>
        );
    }
}
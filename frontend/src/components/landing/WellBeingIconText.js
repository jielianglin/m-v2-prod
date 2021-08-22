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
                <Typography variant="h2" style={{ textAlign: "left", margin: "50px", backgroundColor: "#E6DAC8" }}>Well-Being</Typography>
                <Typography style={{ margin: "100px 200px 100px 200px" }}>
                    Well-being takes different shapes in different territories.
                    In some there are collective practices while in others individuals.
                    The meaning of this word will be explored, and as well multi-cultural
                    rituals for wellbeing.
                    <br />
                    <br />
                    The “Well-Being” dataset focuses on sharing happy and positive memories of migration experiences.
                    These perspectives are often missing in  the mainstream media narrative of migration and migrants.
                    We want to provide better photographic descriptions of migrant experiences that are not focused
                    on victimhood and suffering. In the time of the global pandemic, we are also focused on sharing and
                    connecting intercultural concepts of well-being for the global community.
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
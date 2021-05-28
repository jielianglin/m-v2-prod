
import Button from "@material-ui/core/Button";
import solidarityIcon from "./icons/solidarityIcon/solidarityIcon.png"

export default function homeIconButton(props){
    return(
        <Button>
    <img src={solidarityIcon} alt="" width="130px" onClick={()=>{
        props.showSolidarityIconText();
        }} />
    </Button>
        );
}
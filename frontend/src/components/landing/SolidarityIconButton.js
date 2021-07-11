import React from 'react';
import Button from "@material-ui/core/Button";
import solidarityIcon from "./icons/solidarityIcon/solidarityIcon.png"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
        },
    },
}));

export default function HomeIconButton(props) {
    const [solidarityText, showSolidarityText] = React.useState(false);
    const classes = useStyles();

    const showText = () => {
        showSolidarityText(true);
        console.log('mouseover');
    }

    const showIcon = () => {
        showSolidarityText(false);
        console.log('mouseout');
    }

    if (solidarityText) {
        return (

            <Button
                onClick={() => {
                    props.showSolidarityIconText();
                }}
            >
                <div className={classes.root}
                    onMouseOut={showIcon}
                >
                    <Paper elevation={0} className={classes.paper}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "transparent"
                        }}>
                        <Typography variant="h6"> Solidarity </Typography>
                    </Paper>
                </div>
            </Button>
        );
    } else {
        return (
            <img src={solidarityIcon}
                alt=""
                width="130px"
                onMouseOver={showText}
                onClick={() => {
                    props.showSolidarityIconText();
                }}
            />)
    }
}
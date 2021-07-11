import React from 'react';
import Button from "@material-ui/core/Button";
import wellBeingIcon from "./icons/wellBeingIcon/wellBeingIcon.png"

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

export default function WellBeingIcon(props) {
    const [wellBeingText, showWellBeingText] = React.useState(false);
    const classes = useStyles();

    const showText = () => {
        showWellBeingText(true);
        console.log('mouseover');
    }

    const showIcon = () => {
        showWellBeingText(false);
        console.log('mouseout');
    }

    if (wellBeingText) {
        return (
            <Button onClick={() => {
                props.showWellBeingIconText();
            }}>
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
                        <Typography variant="h6"> Well-Being </Typography>
                    </Paper>
                </div>
            </Button>
        );
    } else {
        return (
            <img src={wellBeingIcon}
                alt=""
                width="130px"
                onMouseOver={showText}
                onClick={() => {
                    props.showWellBeingIconText();
                }}
            />)
    }
}
import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Button from "@material-ui/core/Button";
import wellBeingIcon from "./icons/wellBeingIcon/wellBeingIcon.png"
import Popover from "@material-ui/core/Popover";
import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
import Chip from "@material-ui/core/Chip";
import Avatar from '@material-ui/core/Avatar';

// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         '& > *': {
//             margin: theme.spacing(1),
//             width: theme.spacing(14),
//             height: theme.spacing(14),
//         },
//         paper: {
//             padding: theme.spacing(2),
//             textAlign: 'center',
//         },
//     },
// }));

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: 'transparent',
    },
}));

export default function WellBeingIcon(props) {
    // const [wellBeingText, showWellBeingText] = React.useState(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const showText = () => {
    //     showWellBeingText(true);
    //     console.log('mouseover');
    // }

    // const showIcon = () => {
    //     showWellBeingText(false);
    //     console.log('mouseout');
    // }

    const showPopover = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    // if (wellBeingText) {
    //     return (
    //         <Button onClick={() => {
    //             props.showWellBeingIconText();
    //         }}>
    //             <div className={classes.root}
    //                 onMouseOut={showIcon}
    //             >
    //                 <Paper elevation={0} className={classes.paper}
    //                     style={{
    //                         display: "flex",
    //                         justifyContent: "center",
    //                         alignItems: "center",
    //                         backgroundColor: "transparent"
    //                     }}>

    //                     <Typography variant="h6"> Well-Being </Typography>
    //                 </Paper>
    //             </div>
    //         </Button>
    //     );
    // } else {

    return (
        <div>
            <img src={wellBeingIcon}
                alt=""
                width="110px"
                onMouseEnter={showPopover}
                onMouseLeave={closePopover}
                onClick={() => {
                    props.showWellBeingIconText();
                }}
            />
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                elevation={0}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={closePopover}
                disableRestoreFocus
            >
                <Typography variant='h6'>
                    <Chip avatar={<Avatar>#</Avatar>} label="Well-Being" />
                </Typography>
            </Popover>
        </div >
    )
}

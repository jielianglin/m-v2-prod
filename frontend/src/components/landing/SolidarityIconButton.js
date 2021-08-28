import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Button from "@material-ui/core/Button";
import solidarityIcon from "./icons/solidarityIcon/solidarityIcon.png"
import { makeStyles } from '@material-ui/core/styles';
import Popover from "@material-ui/core/Popover";
// import Box from '@material-ui/core/Box';
import Chip from "@material-ui/core/Chip";
import Avatar from '@material-ui/core/Avatar';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';


// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         '& > *': {
//             margin: theme.spacing(1),
//             width: theme.spacing(16),
//             height: theme.spacing(16),
//         },
//         paper: {
//             padding: theme.spacing(2),
//             textAlign: 'center',
//         },
//     },
// }));



const theme = createTheme({
    palette: {
        primary: {
            main: '#B272CE',
            dark: '#B272CE'
        },
        // secondary: {
        //     main: '#f44336',
        // },
    },
});

const useStyles = makeStyles((theme) => ({

    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: 'transparent',
    },
}));


export default function HomeIconButton(props) {
    // const [solidarityText, showSolidarityText] = React.useState(false);

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const showText = () => {
    //     showSolidarityText(true);
    //     console.log('mouseover');
    // }

    // const showIcon = () => {
    //     showSolidarityText(false);
    //     console.log('mouseout');
    // }

    const showPopover = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    // if (solidarityText) {
    //     return (

    //         <Button
    //             onClick={() => {
    //                 props.showSolidarityIconText();
    //             }}
    //         >
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
    //                     <Typography variant="h6"> Solidarity </Typography>
    //                 </Paper>
    //             </div>
    //         </Button>
    //     );
    // } else {

    return (
        <div>
            <img src={solidarityIcon}
                alt=""
                width="110px"
                onMouseEnter={showPopover}
                onMouseLeave={closePopover}
                onClick={() => {
                    props.showSolidarityIconText();
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
                <Typography fontweight='fontWeightLight' variant='h6'>
                    <ThemeProvider theme={theme} >
                        <Chip variant="outlined" color="primary"
                            avatar={<Avatar>
                                <div style={{ color: "#E6DAC8" }}>
                                    #
                                </div>
                            </Avatar>}
                            label="Solidarity" />
                    </ThemeProvider>
                </Typography>
            </Popover>
        </div>
    )
}

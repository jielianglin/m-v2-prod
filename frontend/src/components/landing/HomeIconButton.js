import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Button from "@material-ui/core/Button";
import homeIcon from "./icons/homeIcon/homeIcon.png";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from '@material-ui/core/styles';

// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     '& > *': {
//       margin: theme.spacing(1),
//       width: theme.spacing(16),
//       height: theme.spacing(16),
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//     },
//   },
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

export default function HomeIconButton(props) {
  // const [homeText, showHomeText] = React.useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const showText = () => {
  //   showHomeText(true);
  //   console.log('mouseover');
  // }

  // const showIcon = () => {
  //   showHomeText(false);
  //   console.log('mouseout');
  // }

  const showPopover = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // const open = Boolean(anchorEl);
  // if (homeText) {
  //   return (
  //     <Button onClick={() => {
  //       props.showHomeIconText();
  //     }}>
  //       <div className={classes.root}
  //         onMouseOut={showIcon}
  //       >
  //         <Paper elevation={0} className={classes.paper}
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             backgroundColor: "transparent"
  //           }}>
  //           <Typography variant="h6"> Home </Typography>
  //         </Paper>
  //       </div>
  //     </Button>
  //   );
  // } else {
  return (
    <div>
      <img
        src={homeIcon}
        alt=""
        width="130px"
        onMouseEnter={showPopover}
        onMouseLeave={closePopover}
        onClick={() => {
          props.showHomeIconText();
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
          <Box fontWeight="fontWeightRegular">
            Home
          </Box>
        </Typography>
      </Popover>
    </div>
  )
}


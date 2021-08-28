import React from "react";
import Button from "@material-ui/core/Button";
import ExploreIMG from "./exploreIMG/ExploreIMG.png";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: 'transparent',
  },
}));

export default function ExploreButton(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const showPopover = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const closePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  return (
    <div>
      <Button
        className="explore-button"
        onMouseEnter={showPopover}
        onMouseLeave={closePopover}
        onClick={() => {
          props.changeMode();
        }}
      >
        <img src={ExploreIMG} width="110px" alt="explore" />
      </Button>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        elevation={0}
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={closePopover}
        disableRestoreFocus
      >
        <Typography variant='h6' style={{ color: "#B272CE" }}>
          Explore
        </Typography>
      </Popover>
    </div>
  );
}

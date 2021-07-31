import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import Popover from "@material-ui/core/Popover";
import Caption from "../annotation/Caption";
import Tags from "../annotation/Tags";
import UploadIMG from './uploadIMG/UploadIMG.png';

import Chip from "@material-ui/core/Chip";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: 'transparent',
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: "#9611ff",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


export default function CustomizedDialogs() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        className="upload-button"
        onClick={handleClickOpen}
        onMouseEnter={showPopover}
        onMouseLeave={closePopover}
      >
        <img src={UploadIMG} alt="upload" width="110px" />
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
        <Typography variant='h6'>
          <Chip label="upload" />
        </Typography>
      </Popover>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle
          //newTitle={newTitle}
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Upload Image
        </DialogTitle>
        <DialogContent dividers>
          <Caption />
          <Tags />
        </DialogContent>
      </Dialog>
    </div>
  );
}

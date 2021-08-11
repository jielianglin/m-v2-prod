import React from "react";
import axios from "axios";

import UploadIMG from './uploadIMG/UploadIMG.png';

import Caption from "../annotation/Caption";
import Tags from "../annotation/Tags";
import FileInputSimple from "./FileInputSimple";

import { Typography, Chip, Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { ThemeProvider } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";


import Popover from "@material-ui/core/Popover";

import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";


//popover styling
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: 'transparent',
  },
}));

//dialog styling
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: "#2B4466",
    backgroundColor: "#E6DAC8",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// return form styling
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9611ff",
    },
    secondary: {
      main: "#668389",
    },
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
    backgroundColor: "#E6DAC8",
  },
}))(MuiDialogContent);


export default function CustomizedDialogs(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [forms, setForms] = React.useState(false);

  const [post, setPost] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const [src, setSrc] = React.useState(null);
  const [caption, setCaption] = React.useState(null);
  const [returnTags, setReturnTags] = React.useState(null);
  const [returnCaption, setReturnCaption] = React.useState(null);
  const [returnAITags, setReturnAITags] = React.useState([]);
  const [progress, setProgress] = React.useState(false);

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

  const showInputForms = () => {
    setForms(true);
  }

  const enteredCaption = (caption) => {
    setCaption(caption);
  };
  const selectedTags = (tags) => {
    setTags(tags);
  };

  const selectedImage = (img) => {
    setImage(img);
  };

  async function postData() {
    setProgress(true);
    console.log(tags);
    console.log(tags.join(","));
    let formData = new FormData();
    formData.append("file", image);
    formData.append("tags", tags.join(","));
    formData.append("caption", caption);
    let response = await axios.post("http://localhost:8000/images", formData);
    props.newTitle();
    setSrc(`http://localhost:8000/images/${response.data.id}.jpeg`);
    console.log(response.data.caption);
    setReturnCaption(response.data.caption);
    console.log(response.data.tags);
    setReturnTags(response.data.tags);
    console.log(response.data.ai_tags);
    setReturnAITags(response.data.ai_tags || []);
    setPost(true);
    setProgress(false);
  }


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
          {post ?

            <div className="returnForm" >
              <img
                style={{
                  display: "block",
                  margin: "0 auto",
                  height: "50%",
                  borderRadius: "5px",
                }}
                className="returned-image"
                src={src}
                alt=""
              />
              <br />
              <ThemeProvider theme={theme}>
                <Typography variant="h6" color="primary">
                  <div className="returned-caption">
                    <i>"</i>
                    <i>
                      {" "}
                      <span>{returnCaption}</span>{" "}
                    </i>
                    <i>"</i>
                  </div>
                </Typography>
                <br />
                <span className="tags-return">
                  <Typography color="primary"> Your Tags: </Typography>
                  {returnTags.map((item) => (
                    <Chip
                      color="primary"
                      className="returned-tags-chip"
                      avatar={
                        <Avatar>
                          #
                        </Avatar>
                      }
                      key={item.id}
                      label={item.tag}
                      variant="outlined"
                    />
                  ))}
                </span>
                <br />
                <br />
                <span className="ai_tags_return">
                  <Typography color="secondary"> Tags from ImageNet AI: </Typography>
                  {returnAITags.length === 0 && (
                    <Typography variant="h12" color="secondary">
                      <i>[couldn't identify any tags] </i>
                    </Typography>
                  )}

                  {returnAITags.map((item) => (
                    <Chip
                      style={{ color: "#668389" }}
                      className="returned-ai-tags-chip"
                      avatar={
                        <Avatar style={{ background: "#668389" }}>

                          #
                        </Avatar>
                      }
                      key={item.id}
                      label={item.tag}
                    />
                  ))}
                </span>

                <br />
                <br />
              </ThemeProvider>
            </div>

            :

            <div className="postForm">
              {forms &&
                <Caption enteredCaption={enteredCaption} />}

              <FileInputSimple
                showInputForms={showInputForms}
                FileInput selectedImage={selectedImage}
              />
              {forms && <Tags selectedTags={selectedTags} />}
              );

              <div className="save-data">
                <Button
                  disabled={!image || !caption || tags.length === 0}
                  className="save-button"
                  palette="primary"
                  onClick={postData}
                >
                  {" "}
                  Save{" "}
                </Button>
                <ThemeProvider theme={theme}>
                  {progress && <CircularProgress />}
                </ThemeProvider>
              </div>

            </div>

          }

        </DialogContent>
      </Dialog>
    </div>
  );
}


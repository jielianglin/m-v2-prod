import React, { useState, useEffect } from 'react';
import SearchBar from "material-ui-search-bar";
import { Typography, Chip, Avatar } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { withStyles } from "@material-ui/core/styles";

import MatchBar from "./Matchbar";

// import image1 from './Gallery/image1/image1.jpg';
// import image2 from './Gallery/image2/image2.jpg';
// import image3 from './Gallery/image3/image3.png';

// const images = [
//   { id: 1, src: `${image1}` },
//   { id: 2, src: `${image2}` },
//   { id: 3, src: `${image3}` },
// ]

// styling for dialog

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "transparent",
    boxShadow: theme.shadows[5],
    outline: "none",
    borderRadius: "5px",
  },
  modal: {
    display: "flex",
    padding: "none",
    alignItems: "center",
    justifyContent: "center",
  },
}));

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
    backgroundColor: "#E6DAC8"
  },
}))(MuiDialogContent);

export default function Search() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [gallery, setGallery] = React.useState(true);
  const [carousel, setCarousel] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onSubmit(e) {
    e.preventDefault();
    setQuery(search);
    console.log(search);
  }

  const onSearch = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/images?tag=${query}`
        );
        const json = await response.json();
        console.log({ json });
        setResults(json);
        handleOpen();
      } catch (error) { }
    }

    if (query !== "") {
      console.log("the data does not exist");
      fetchData();
    }
  }, [query]);

  const showCarousel = () => {
    setGallery(false);
    setCarousel(true);
  }

  const showGallery = () => {
    setCarousel(false);
    setGallery(true);
  }

  return (
    <div>
      <div className="searchBar" style={{ padding: "15px 20px 0px 0px" }}>
        <SearchBar
          placeholder='Search a tag'
          value={search}
          onChange={onSearch}
          onRequestSearch={onSubmit}
          cancelOnEscape="true"
        />
      </div>
      <div className="eChartsGallery">
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
          maxWidth="md"
          fullWidth={true}
        >
          <DialogTitle
            //newTitle={newTitle}
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <Typography variant="h5">Images for `${search}`</Typography>
          </DialogTitle>
          <DialogContent dividers>
            {gallery && (
              <div className="gallery">
                <div className={classes.root}>
                  <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                    {results.map((image) => (
                      <ImageListItem key={image.id} cols={image.cols || 1} >
                        <img src={image.id} alt="" maxHeight="100px" onClick={showCarousel}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </div>
            )}
            {carousel && (
              <Carousel>
                {results.map((item) => (
                  <div className="carouselResults">
                    <Typography className="mtag-label"> {item.caption}
                    </Typography>
                    <div key={item.id} cols={item.cols || 1} style={{ display: "flex", justifyContent: "center" }}>
                      <img id={item.id} src={item.src} alt="" maxHeight="100px" onClick={showGallery}
                      />
                    </div>

                    <div className="metadata" >
                      <div style={{ display: "block", textAlign: "center" }}>
                        <Typography className="mtag-label"> Our Tags:
                        </Typography>
                      </div>
                      <div className="userTags" style={{ display: "flex", justifyContent: "center", padding: "10px" }}>


                        {item.tags.map((posttag) => {

                          return (
                            <Chip className="chip1" style={{ color: "#B272CE", backgroundColor: "#FFFFFF" }} avatar={
                              <Avatar style={{ color: "#B272CE" }}>
                                <div style={{ color: "#FFFFFF" }}>
                                  #
                                </div>
                              </Avatar>
                            }
                              key={posttag.id}
                              label={posttag.tag}
                              component="a"
                              href="#chip"
                              variant="outlined"
                              color="primary"
                              clickable
                            />
                          );
                        })}
                      </div>

                      <div style={{ display: "block", textAlign: "center" }}>
                        <Typography className="ai_tags"> Tags from ImageNet AI:
                        </Typography>
                      </div>
                      <div className="AITAgs" style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                        {item.ai_tags.map((aitag) => {

                          return (
                            <Chip className="chip2" style={{ color: "#000000", backgroundColor: "#FFFFFF" }} avatar={
                              <Avatar style={{ background: "#B5BCB4" }}>
                                <div style={{ color: "#FFFFFF" }}>
                                  #
                                </div>
                              </Avatar>
                            }
                              key={aitag.id}
                              label={aitag.tag}
                              component="a"
                              href="#chip"
                              clickable
                            />
                          );
                        })}
                      </div>
                      <div>
                        {item.ai_tags.map((aiitem) => {
                          return (
                            <MatchBar
                              match={parseFloat(aiitem.confidence)}
                              aitag={aiitem.tag}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>))}
              </Carousel>
            )
            }
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
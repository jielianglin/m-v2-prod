import React, { useState, useEffect } from 'react';
import SearchBar from "material-ui-search-bar";
import { Typography, Chip, Avatar } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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

    return (
      <Carousel>
        {results.map((image) => (
          <div key={image.id} cols={image.cols || 1} >
            <img src={image.id} alt="" maxHeight="100px" onClick={showCarousel}
            />
          </div>
        ))}
      </Carousel>
    )
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
              <div className="carousel">
                <img src={image.id} alt="" maxHeight="100px" onClick={showGallery} />
              </div>
            )
            }
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
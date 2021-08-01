import React, { useState, useEffect } from 'react';
import SearchBar from "material-ui-search-bar";
import { Typography, Chip, Avatar } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
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

  return (
    <div>
      <div style={{ padding: "15px 20px 0px 0px" }}>
        <SearchBar
          placeholder='Search a tag'
          value={search}
          onChange={onSearch}
          onRequestSearch={onSubmit}
          cancelOnEscape="true"
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {/* <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={Object.keys(data.json[i]).length}
        >
          {/* <Slider className="slider">

            {/* {results.map((item) => (
              <div>
                <div key={item.id} className="paper-slider">
                  <div className="slide">
                    <Slide index={item.id}>
                      <Image
                        src={`http://localhost:8000/images/${item.id}.jpeg`}
                        alt="img-result"
                      // onClick={handleOpen}
                      />

                    </Slide>
                    <DotGroup />
                  </div>
                  <div className="caption">
                    <Typography
                      variant="h6"
                      component="p"
                      className="caption-wrap"
                    >
                      <i>"{item.caption}"</i>
                    </Typography>
                  </div>

                  <div className="mtag-wrap">
                    <Typography className="mtag-label">
                      Our tags:
                    </Typography>
                    {item.tags.map((posttag) => {
                      console.log(posttag.tag);
                      return (
                        <Chip
                          className="chip1"
                          avatar={
                            <Avatar>
                              <AiOutlineNumber />
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
                    })} */}
        {/* </div> */}
        {/* <div className="ntag-wrap">
                    <Typography className="ntag-label">
                      AI tags (from ImageNet):
                    </Typography> */}

        {/* {item.ai_tags.map((posttag) => {
                      console.log(posttag.tag);
                      return (
                        <Chip
                          className="chip2"
                          style={{ color: "#668389" }}
                          avatar={
                            <Avatar style={{ background: "#668389" }}>
                              <AiOutlineNumber style={{ color: "white" }} />
                            </Avatar>
                          }
                          key={posttag.id}
                          label={posttag.tag}
                          component="a"
                          href="#chip"
                          clickable
                        />
                      );
                    })}
                  </div> */}
        {/* <div>
                    {item.ai_tags.map((aiitem) => {
                      return (
                        <MatchBar
                          match={parseFloat(aiitem.confidence)}
                          aitag={aiitem.tag}
                        />
                      );
                    })}
                  </div> */}
        {/* </div>
              </div>
            ))} */}
        {/* </Slider> */}
        {/* <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider> */}
      </Modal>
    </div>
  );
}
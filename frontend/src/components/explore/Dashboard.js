import React, { useEffect } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { Typography, Chip, Avatar } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';

import image1 from './Gallery/image1/image1.jpg';
import image2 from './Gallery/image2/image2.jpg';
import image3 from './Gallery/image3/image3.png';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Carousel from 'react-material-ui-carousel'

const images = [
    { id: 1, src: `${image1}`, tags: ["tag1", "tag2", "tag3"], caption: "Here is caption1", ai_tags: ["ai_tag1", "ai_tag2", "ai_tag3"] },
    { id: 2, src: `${image2}`, tags: ["tag4", "tag5", "tag6"], caption: "Here is caption2", ai_tags: ["ai_tag4", "ai_tag5", "ai_tag6"] },
    { id: 3, src: `${image3}`, tags: ["tag7", "tag8", "tag9"], caption: "Here is caption3", ai_tags: ["ai_tag7", "ai_tag8", "ai_tag9"] },
]

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: "#E6DAC8",
    },
    imageList: {
        width: 500,
        height: 450,
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


export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [results, setResults] = React.useState([]);
    const [gallery, setGallery] = React.useState(true);
    const [carousel, setCarousel] = React.useState(false);
    // const [slidePosition, setSlidePosition] = React.useState([]);

    const removeImage = (src) => {
        setResults((oldState) => oldState.filter((item) => item.src !== src));
    };

    // useEffect(() => {

    //         async function fetchData() {
    //             try {
    //                 const response = await fetch(
    //                     `http://127.0.0.1:8000/username`
    //                 );
    //                 const images = await response.json();
    //                 console.log({ images });
    //                 setResults(images);
    //             } catch (error) {} 

    //             }
    // }, []);


    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);

    };

    const showCarousel = (e) => {
        setGallery(false);
        // setSlidePosition(e.target.id);
        setCarousel(true);
        // return (
        // )
    }

    const showGallery = () => {
        setCarousel(false);
        setGallery(true);
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AccountCircleIcon style={{ fontSize: 50, color: "#FFFFFF" }} />
            </IconButton>
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
                    <Typography variant="h5">Manage my pictures</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    {gallery && (
                        <div className="gallery">
                            <div className={classes.root}>
                                <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                                    {results.map((image) => (

                                        <ImageListItem key={image.id} cols={image.cols || 1} >
                                            <div style={{ position: "absolute", zIndex: 2 }}>
                                                <IconButton size="small" onClick={() => removeImage(image.src)}><HighlightOffIcon /></IconButton>
                                            </div>
                                            <img id={image.id} src={image.src} alt="" maxHeight="100px"
                                                onClick={showCarousel} />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </div>
                        </div>
                    )}
                    {carousel && (
                        <Carousel>
                            {results.map((image) => (
                                <div className="carouselResults">
                                    <Typography className="mtag-label"> {image.caption}
                                    </Typography>
                                    <div key={image.id} cols={image.cols || 1} style={{ display: "flex", justifyContent: "center" }}>
                                        <img id={image.id} src={image.src} alt="" maxHeight="100px" onClick={showGallery}
                                        />
                                    </div>

                                    <div className="metadata" >
                                        <div style={{ display: "block", textAlign: "center" }}>
                                            <Typography className="mtag-label"> Our Tags:
                                            </Typography>
                                        </div>
                                        <div className="userTags" style={{ display: "flex", justifyContent: "center", padding: "10px" }}>


                                            {image.tags.map((sampletag) => {

                                                return (
                                                    <Chip className="chip1" avatar={
                                                        <Avatar>
                                                            #
                                                        </Avatar>
                                                    }
                                                        key={image.id}
                                                        label={sampletag}
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
                                            <Typography className="ai_tags"> ImageNet Tags:
                                            </Typography>
                                        </div>
                                        <div className="AITAgs" style={{ display: "flex", justifyContent: "center", padding: "10px" }}>


                                            {image.ai_tags.map((sampletag) => {

                                                return (
                                                    <Chip className="chip2" style={{ color: "#668389" }} avatar={
                                                        <Avatar style={{ background: "#668389" }}>
                                                            #
                                                        </Avatar>
                                                    }
                                                        key={image.id}
                                                        label={sampletag}
                                                        component="a"
                                                        href="#chip"
                                                        clickable
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
        </div >
    )
}

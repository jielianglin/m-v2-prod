import React, { useEffect } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
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
    { id: 1, src: `${image1}` },
    { id: 2, src: `${image2}` },
    { id: 3, src: `${image3}` },
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
    // const [select, setSelect] = React.useState(false);
    const [pics, setPics] = React.useState([]);
    const [gallery, setGallery] = React.useState(true);
    const [carousel, setCarousel] = React.useState(false);
    const [slidePosition, setSlidePosition] = React.useState([]);

    const removeImage = (src) => {
        setPics((oldState) => oldState.filter((item) => item.src !== src));
    };

    useEffect(() => {
        //fake fetch data
        setPics(images);
        console.log(images)
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);

    };

    const showCarousel = (e) => {
        setGallery(false);
        setSlidePosition(e.target.id);
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
                <AccountCircleIcon style={{ fontSize: 80, color: "#FFFFFF" }} />
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
                                    {pics.map((image, index) => (
                                        <ImageListItem key={index} cols={image.cols || 1} >
                                            <div style={{ position: "absolute", zIndex: 2 }}>
                                                <IconButton size="small" onClick={() => removeImage(image.src)}><HighlightOffIcon /></IconButton>
                                            </div>
                                            <img key={index} id={image.id} src={image.src} alt="" maxHeight="100px"
                                                onClick={showCarousel}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </div>
                        </div>
                    )}
                    {carousel && (
                        <Carousel>
                            {images.map((image, index) => (
                                <div key={index} cols={image.cols || 1} style={{ display: "flex", justifyContent: "center" }}>
                                    <img key={index} id={image.id} src={image.src} alt="" maxHeight="100px" onClick={showGallery}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    )
                    }
                </DialogContent>
            </Dialog>
        </div >
    )
}
